const moment = require('moment');
const qs = require('qs');
const request = require('request-promise');
const UserModel = require('../../models/user/user.model');
const BetModel = require('../../models/quiz/bet.model');
const QuizModel = require('../../models/quiz/quiz.model');
const SettingsModel = require('../../models/comm/settings');
const UpDownModel = require('../../models/quiz/upDown.model');
const LotteryModel = require('../../models/quiz/lottery.model.js');
class IndexController {

    //获取公告配置
    static async getAnnouncement(ctx) {
        const data = await SettingsModel.findOne({type: "announcement"});
        console.log(data)
        if (!data) {
            return ctx.body = {message: '获取公告失败', code: 404}
        }
        return ctx.body = {code: 200, config: data.config}
    }

    static async getConfig(ctx) {
        const data = await SettingsModel.findOne({type: "platfrom"}, {"_id": 0, "updatedAt": 0, "createdAt": 0});
        return ctx.body = {appid: data.config.wxAppID, code: 200}
    }


    static async getLive2(ctx) {
        const lottery = await LotteryModel.findOne({}, {'_id': 0}).sort({"_id": -1}).limit(1)

        if (lottery) { //判断存在
            /*
             "time": 1503934094,
             "current": {
             "periodNumber": "636841",
             "period": "636841",
             "periodDate": "636841",
             "awardTime": "2017-08-28 23:22:00",
             "awardNumbers": "1,3,6,4,5,9,2,7,8,10"
             },
             "next": {
             "periodNumber": "636843",
             "period": "636843",
             "periodDate": "636843",
             "awardTime": "2017-08-28 23:32:00",
             "awardTimeInterval": -226000,
             "delayTimeInterval": 10
             }
             */
            const live = {
                time: parseInt(Date.now() / 1000),
                current: {
                    periodNumber: lottery.no + '',
                    period: lottery.no + '',
                    periodDate: lottery.no + '',
                    awardTime: lottery.opentime,
                    awardNumbers: lottery.code,
                },
                next: {
                    periodNumber: lottery.no + 1 + '',
                    period: lottery.no + 1 + '',
                    periodDate: lottery.no + 1 + '',
                    awardTime: moment(lottery.opentime).add(5, "m").format('YYYY-MM-DD hh:mm:ss'),
                    //awardTimeInterval: moment(lottery.opentime).add(4, "m").valueOf() + 10 * 1000 - moment().valueOf(),
                    awardTimeInterval: Math.floor((moment(lottery.opentime).add(4, "m").valueOf() + 30 * 1000 - moment().valueOf()) / 1000) * 1000,
                    delayTimeInterval: 1000,
                }

            }
            console.log(live)
            return ctx.body = live
        } else {
            return ctx.body = {message: "获取失败", code: 404}
        }
    }


    static async getLive(ctx) {
        const {type} =  ctx.request.query;
        const lottery = await LotteryModel.findOne({type: type.toUpperCase()}, {'_id': 0}).sort({"no": -1})
        if (lottery) { //判断存在
            const live = {
                time: parseInt(Date.now() / 1000),
                current: {
                    no: lottery.no,
                    opentime: lottery.opentime,
                    code: lottery.code,
                },
                next: {
                    no: lottery.no + 1,
                    //moment(lottery.opentime, "YYYY-MM-DD HH:mm", "zh-cn").format('YYYY-MM-DD HH:mm:ss')
                    opentime: moment(lottery.opentime).add(7, "m").format('YYYY-MM-DD HH:mm:ss'),
                    leftTime: moment(lottery.opentime).add(7, "m").diff(moment(), 'seconds'),
                    delayTime: 5000,
                }

            }
            console.log(live)
            //console.log(lottery.opentime,moment(lottery.opentime, "YYYY-MM-DD HH:mm", "zh-cn").format('YYYY-MM-DD HH:mm:ss'),'==============', Date.now().toString())
            return ctx.body = {code: 200, lottery: live}
        } else {
            return ctx.body = {message: "获取失败", code: 404}
        }
    }

    // 下注
    static async createBet(ctx) {
        const {userid, no, game, method, nickname, choice, avatar} = ctx.request.body;
        console.log(ctx.request.body);
        if (!userid || !no || !choice || !game) return ctx.body = {message: '不能为空', code: 400}
        const user = await UserModel.findOne({_id: userid});
        if (user) return ctx.body = {message: '用户不存在', code: 400}
        const amount = 100000;
        if (user.balance < amount) {
            log.error("User: ", userid, "余额不足")
            return ctx.body = {message: '余额不足', code: 400};
        }

        const query = {_id: userid};
        if (user.balance !== 0) {
            query.balance = user.balance
        }

        const ret = await UserModel.update(query, {'$inc': {balance: -amount}}, {upsert: false});
        if (ret.nModified !== 1) {
            log.error("更新余额失败:", query, {'$inc': {balance: -amount}}, ret);
            return ctx.body = {message: '更新余额失败', code: 400};
        }

        const record = {from: 1, no, userid, game, method, nickname, choice, avatar, amount}
        const result = await BetModel.create(record);
        if (!result) {
            log.error("下注保存失败: ", result);
            return ctx.body = {message: '下注失败', code: 400};
        }
        return ctx.body = {result, code: 200}
    }

    static async getUserInfo(ctx) { //微信用过
        const openid = ctx.cookies.get("bjsc", {sign: true})
        if (openid == undefined || openid === '') {
            const data = await SettingsModel.findOne({type: "platfrom"});
            return ctx.body = {appid: data.config.wxAppID, code: 300}
        } else {
            const userinfo = await UserModel.findOne({openid}, {'_id': 0, '__v': 0, 'createdAt': 0});
            if (!userinfo) {
                return ctx.body = {message: '获取消息失败', code: 400}
            }
            return ctx.body = {userinfo, code: 200}
        }
    }

    static async getUserDetail(ctx) { //最近登录方式使用
        const userid = ctx.params.userid;
        if (userid == undefined || userid === '') {
        } else {
            const userinfo = await UserModel.findOne({'_id': userid}, {'__v': 0, 'password': 0, 'createdAt': 0});
            if (!userinfo) {
                return ctx.body = {message: '获取消息失败', code: 400}
            }
            userinfo.userid = userid
            return ctx.body = {userinfo, code: 200}
        }
    }

    static async getCurrLottery(ctx) {
        const {type} =  ctx.request.query;
        const lottery = await LotteryModel.find({type: type.toUpperCase()}, {'_id': 0}).sort({"no": -1}).limit(1)
        console.log(lottery)
        if (lottery) { //判断存在
            return ctx.body = {lottery: lottery[0], code: 200}
        } else {
            return ctx.body = {message: "获取失败", code: 404}
        }
    }

    static async auth(ctx) {
        console.log(ctx.request.body, ctx.request.query)
        const {parent_openid, code, callback} = ctx.request.query
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
            profile: `${province}-${city}`,
        };

        if (parent_openid !== undefined) {
            updateDoc.createdAt = Date.now(),
                updateDoc.agentId = parent_openid
        }

        const result = await UserModel.update({openid}, {'$set': updateDoc}, {upsert: true});

        ctx.cookies.set("bjsc", openid, {sign: true})
        ctx.redirect(callback)
    }

    // 获取账户余额等
    static async getAccount(ctx) {
        const {userid} =  ctx.request.query;
        if (userid === undefined || userid === '') {
            return ctx.body = {message: 'userid 不能为空', code: 400}
        }
        const user = await UserModel.findOne({_id: userid}, {'_id': 0, '__v': 0});
        if (user) {
            return ctx.body = {
                account: {balance: user.balance, lossToday: user.lossToday, rebate: user.rebate},
                code: 200
            }
        }
        return ctx.body = {message: '获取账户失败', code: 404}
    }

    // 获取下注消息
    static async getMessages(ctx) {
        //const {no} =  ctx.request.query;
        const messages = await BetModel.find({}, {'_id': 0, '__v': 0, "dealed": 0, "openid": 0, "amount": 0})
            .sort({"createdAt": -1}).limit(50);
        if (!messages) {
            return ctx.body = {message: '获取消息失败', code: 404}
        }
        ctx.body = {code: 200, data: messages}
    }

    // 上分
    static async createUp(ctx) {
        const {userid, nickname, avatar, payMethod, payNo, profile, amount} = ctx.request.body;
        console.log(ctx.request.body);
        if (!userid || !amount || amount < 10) return ctx.body = {
            message: '用户名和上/下分不能为空,且金额大于10',
            code: 400
        }
        const result = await UpDownModel.create({
            userid,
            nickname,
            avatar,
            type: true,
            payMethod,
            payNo,
            profile,
            amount
        });
        if (result) return ctx.body = {code: 200}
        else ctx.body = {message: "上分请求失败", code: 400}
    }

    // 下分
    static async createDown(ctx) {
        const {userid, nickname, avatar, payMethod, payNo, profile, amount} = ctx.request.body;
        console.log(ctx.request.body);
        if (!userid || !amount || amount < 0) return ctx.body = {message: '用户名和上/下分不能为空,且金额大于0', code: 400}
        const result = await UpDownModel.create({
            userid, nickname, avatar, type: false, payMethod, payNo, profile, amount
        });
        if (result) return ctx.body = {code: 200}
        else ctx.body = {message: "下分请求失败", code: 400}
    }

    // 充值记录，即上下分记录
    static async getRechargeRecords(ctx) {
        const openid = ctx.params.openid;
        const upDowns = await UpDownModel.find({openid},
            {
                "_id": 0, "openid": 0, "nickname": 0, "payMethod": 0, "profile": 0, "updateAt": 0, "byWho": 0,
                "payNo": 0, "__v": 0, "balance": 0, "avatar": 0
            })
            .sort({"_id": 1}).limit(20);
        if (!upDowns) {
            return ctx.body = {message: '获取充值记录失败', code: 404}
        }
        return ctx.body = {upDowns, code: 200}
    }

    // 交易记录
    static async getQuizRecords(ctx) {
        const openid = ctx.params.openid;
        const quizs = await QuizModel.find({openid},
            {"_id": 0, "openid": 0, "createdAt": 0, "nickname": 0, "avatar": 0})
            .sort({"_id": 1}).limit(20);
        if (!quizs) {
            return ctx.body = {message: '获取交易记录失败', code: 404}
        }
        return ctx.body = {quizs, code: 200}
    }

    // 获取开奖消息
    static async getLotterys(ctx) {
        const {type} =  ctx.request.query;
        const lotterys = await LotteryModel.find({type: type.toUpperCase()}, {"_id": 0}).sort({"no": -1}).limit(20);
        if (!lotterys) {
            return ctx.body = {message: '获取开奖记录失败', code: 404}
        }
        ctx.body = {code: 200, lotterys}
    }

}

module.exports = IndexController;
