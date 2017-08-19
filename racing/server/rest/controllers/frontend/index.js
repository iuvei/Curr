const moment = require('moment');
const qs = require('qs');
const request = require('request-promise');
const UserModel = require('../../models/user/user.model');
const BetModel = require('../../models/quiz/bet.model');
const SettingsModel = require('../../models/comm/settings');

class IndexController {

    static async getUserInfo(ctx) {
        const openid = ctx.cookies.get("bjsc", {sign: true})
        if (openid == undefined || openid === '') {
            return ctx.body = {code: 400}
        } else {
            const userinfo = await UserModel.findOne({openid});
            if (!userinfo) {
                return ctx.body = {message: '获取消息失败', code: 404}
            }
            return ctx.body = {userinfo, code: 200}
        }
    }

    static async auth(ctx) {
        console.log(ctx.request.body, ctx.request.query)
        const {code, callback} = ctx.request.query
        const params = {
            appid: 'wx8bba1ed01651ed81',
            secret: 'f641a8051d502141cb09f916ad18439a',
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

    // 获取下注消息
    static async getMessages(ctx) {
        const {no} =  ctx.request.query;
        const messages = await BetModel.find({no}).sort({"createdAt": -1});
        if (!messages) {
            return ctx.body = {message: '获取消息失败', code: 404}
        }
        ctx.body = {code: 200, data: messages}
    }
}

module.exports = IndexController;
