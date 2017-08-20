const moment = require('moment');
const qs = require('qs');
const request = require('request-promise');
const UserModel = require('../../models/user/user.model');
const BetModel = require('../../models/quiz/bet.model');
const SettingsModel = require('../../models/comm/settings');
const UpDownModel = require('../../models/quiz/upDown.model');
class IndexController {

    static async getConfig(ctx) {
        const data = await SettingsModel.findOne({type: "platfrom"});
        return ctx.body = {appid: data.config.wxAppID, code: 200}
    }

    static async getUserInfo(ctx) {
        const openid = ctx.cookies.get("bjsc", {sign: true})
        if (openid == undefined || openid === '') {
            const data = await SettingsModel.findOne({type: "platfrom"});
            return ctx.body = {appid: data.config.wxAppID, code: 300}
        } else {
            const userinfo = await UserModel.findOne({openid});
            if (!userinfo) {
                return ctx.body = {message: '获取消息失败', code: 400}
            }
            return ctx.body = {userinfo, code: 200}
        }
    }

    static async auth(ctx) {
        console.log(ctx.request.body, ctx.request.query)
        const {code, callback} = ctx.request.query
        const data = await SettingsModel.findOne({type: "platfrom"});
        const params = {
            appid: data.config.wxAppID,
            secret: data.config.wxSecret,
            code: code,
            grant_type: 'authorization_code'
        }

        const URL_access_token = `https://api.weixin.qq.com/sns/oauth2/access_token?${qs.stringify(params)}`
        const res_access_token = await request(URL_access_token);
        if (res_access_token.errmsg !== undefined) {
            console.log("获取微信access token失败：", res_access_token.errmsg)
        }
        const acc = JSON.parse(res_access_token);
        const params2 = {
            access_token: acc.access_token,
            openid: acc.openid,
            lang: 'zh_CN'
        };
        const URL_user_info = `https://api.weixin.qq.com/sns/userinfo?${qs.stringify(params2)}`;
        const res_user_info = await request(URL_user_info);
        if (res_user_info.errmsg !== undefined) {
            console.log("获取微信用户信息失败：", res_user_info.errmsg)
        }
        const {openid, nickname, sex, province, city, country, headimgurl}  = JSON.parse(res_user_info);

        const updateDoc = {
            openid,
            nickname,
            gender: sex,
            avatar: headimgurl,
            profile: `${country} ${province},${city}`
        };

        const result = await UserModel.update({openid}, {'$set': updateDoc}, {upsert: true});

        ctx.cookies.set("bjsc", openid, {sign: true})
        ctx.redirect(callback)
    }

    // 获取账户余额等
    static async getAccount(ctx) {
        const {openid} =  ctx.request.query;
        const user = await UserModel.findOne({openid});
        if (user) {
            return ctx.body = {account:{balance: user.balance,lossToday: user.lossToday,rebate: user.rebate}, code: 200}
        }
        return ctx.body = {message: '获取账户失败', code: 404}
    }

    // 获取下注消息
    static async getMessages(ctx) {
        const {no} =  ctx.request.query;
        const messages = await BetModel.find({no}).sort({"createdAt": -1});
        if (!messages) {
            return ctx.body = {message: '获取消息失败', code: 404}
        }
        ctx.body = {code: 200, data: messages}
    }

    // 上分
    static async createUp(ctx) {
        const {openid, nickname, avatar,payMethod,payNo,profile, amount} = ctx.request.body;
        console.log(ctx.request.body);
        if (!openid || !nickname || !amount || amount < 10) return ctx.body = {message: '用户名和上/下分不能为空,且金额大于10', code: 400}
        const result = await UpDownModel.create({openid, nickname, avatar, type:true, payMethod,payNo,profile, amount});
        if (result) return ctx.body = {code: 200, data: result}
        else ctx.body = {data: result, code: 400}
    }

    // 下分
    static async createDown(ctx) {
        const {openid, nickname, avatar,payMethod,payNo,profile, amount} = ctx.request.body;
        console.log(ctx.request.body);
        if (!openid || !amount || amount < 0) return ctx.body = {message: '用户名和上/下分不能为空,且金额大于0', code: 400}
        const result = await UpDownModel.create({
            openid, nickname, avatar, type:false, payMethod,payNo,profile, amount});
        if (result) return ctx.body = {code: 200, data: result}
        else ctx.body = {data: result, code: 400}
    }

}

module.exports = IndexController;
