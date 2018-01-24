const md5 = require('md5');
const UserModel = require('../../models/user/user.model');
const UpDownModel = require('../../models/quiz/upDown.model');
const AgentModel = require('../../models/user/agent.model');
const SettingsModel = require('../../models/comm/settings');
class BackendUser {

    // 成员
    static async createUser(ctx) {
        const {username, nickname, password} = ctx.request.body;
        console.log(ctx.request.body);
        if (!username || !password) return ctx.body = {message: '用户名密码为空', code: 400}
        const isexit = await UserModel.findOne({username});
        if (isexit) return ctx.body = {message: '用户名已存在', code: 400}
        const result = await UserModel.create({username, nickname, password: md5(password)});
        if (result) return ctx.body = {code: 200, data: result}
        else ctx.body = {data: result, code: 400}
    }

    // 获取账户余额等
    static async getAccount(ctx) {
        const {openid} =  ctx.request.query;
        const user = await UserModel.findOne({openid});
        if (user) {
            return ctx.body = {
                account: {balance: user.balance, lossToday: user.lossToday, rebate: user.rebate},
                code: 200
            }
        }
        return ctx.body = {message: '获取账户失败', code: 404}
    }

    // 成员
    static async getAllUsers(ctx) {
        var {pageSize, currPage, username} = ctx.request.query;
        pageSize = (pageSize === undefined || Number(pageSize) < 0) ? 10 : Number(pageSize);
        currPage = (currPage === undefined || Number(currPage) < 0) ? 1 : Number(currPage);
        const query = {};
        if (username !== undefined && username !== '') {
            query.username = {'$regex': eval(`/${username}.*/i`)}
        }

        const users = await UserModel.find(query).sort({"_id": 1}).skip((currPage - 1) * pageSize).limit(pageSize);
        if (!users) {
            return ctx.body = {message: '获取设置信息失败', code: 404}
        }
        const count = await UserModel.find(query).count();
        return ctx.body = {code: 200, data: users, pageSize, currPage, total: Math.ceil(count / pageSize)}
    }

    // 后台用户登录
    static async signIn(ctx) {
        const {username, password} = ctx.request.body;
        console.log(ctx.request.body);
        if (!username || !password) return ctx.body = {message: '用户名密码为空', code: 404}
        // if (name == Adminconfig.name && md5(password) == Adminconfig.password) {
        //     ctx.session.user = {name, password};
        //     ctx.redirect('/server/home');
        // }
        const result = await UserModel.findOne({name, password: md5(password)});
        if (!result) return ctx.body = {message: '登录失败', code: 404}
        ctx.session.user = result;
        return ctx.body = {data: result, code: 200};
    }

    // 后台用户退出
    static async signOut(ctx) {
        ctx.session.user = null;
        return ctx.body = {data: result, code: 200};
    }

    // 代理 测试用
    static async addAgent(ctx) {
        const {username, avatar, numUsers, brokerage, proxyImg, status} = ctx.request.body;
        console.log(ctx.request.body);
        if (!username) return ctx.body = {message: '用户名为空', code: 400}
        const isexit = await AgentModel.findOne({username});
        if (isexit) return ctx.body = {message: '用户名已存在', code: 400}
        const result = await AgentModel.create({username, avatar, numUsers, brokerage, proxyImg, status});
        if (result) return ctx.body = {code: 200, data: result}
        else ctx.body = {data: result, code: 400}
    }

    // 代理
    static async getAllAgents(ctx) {
        var {pageSize, currPage, username} = ctx.request.query;
        pageSize = (pageSize === undefined || Number(pageSize) < 0) ? 10 : Number(pageSize);
        currPage = (currPage === undefined || Number(currPage) < 0) ? 1 : Number(currPage);
        const query = {};
        if (username !== undefined && username !== '') {
            query.username = {'$regex': eval(`/${username}.*/i`)}
        }

        const users = await AgentModel.find(query).sort({"_id": 1}).skip((currPage - 1) * pageSize).limit(pageSize);
        if (!users) {
            return ctx.body = {message: '获取代理推广失败', code: 404}
        }

        for (let i = 0; i < users.length; i++) {  //获取推广人数
            const numUsers = await UserModel.find({agentId: users[i].openid}).count();
            users[i].numUsers = numUsers;
        }

        const count = await AgentModel.find(query).count();
        return ctx.body = {code: 200, data: users, pageSize, currPage, total: Math.ceil(count / pageSize)}
    }


    //管理员上下分记录
    static async updateUpDownByAdmin(ctx) {
        const userid = ctx.params.userid;
        const {type, byWho, amount} = ctx.request.body;

        if (amount <= 0) {
            return ctx.body = {message: '输入错误，点数需大于0', code: 404}
        }

        const user = await UserModel.findOne({"_id": userid})
        if (!user) {
            return ctx.body = {message: '该用户不存在', code: 404}
        }
        var newBalance = user.balance;
        if (type === false) {
            if (amount > user.balance) {
                return ctx.body = {message: '请求金额大于用户余额', code: 404}
            } else {
                newBalance = user.balance - amount
            }
        } else {
            newBalance = user.balance + amount
        }

        const userRet = await UserModel.update({_id: userid, balance: user.balance}, {'$set': {balance: newBalance}})

        if (userRet.nModified !== 1) {
            return ctx.body = {message: '更新用户余额失败', code: 404}
        }

        const ret = await UpDownModel.create({
            userid,
            nickname: user.nickname || user.username,
            avatar: user.avatar,
            type,
            amount: amount,
            balance: newBalance || -1,
            ignore: 3,
            byWho,
            profile: "管理员后台操作上下分",
            updateAt: new Date()
        });

        if (!ret) return ctx.body = {message: '更新上下分请求失败', code: 404}
        return ctx.body = {code: 200}
    }


    //管理员setProxy
    static async setProxy(ctx) {
        const userid = ctx.params.userid;
        const {proxy} = ctx.request.body;

        const user = await UserModel.findOne({_id: userid})
        if (!user) {
            return ctx.body = {message: '该用户不存在', code: 404}
        }

        const userRet = await UserModel.update({_id: userid}, {'$set': {proxy}})
        if (userRet.nModified !== 1) {
            return ctx.body = {message: '设置用户为代理失败', code: 404}
        }

        const updateAgent = {
            nickname: user.nickname,
            avatar: user.avatar,
            proxyImg: '', //暂时没有
            status: proxy,
        }

        const result = await AgentModel.update({_id: userid}, {"$set": updateAgent}, {upsert: true});
        if (result) return ctx.body = {code: 200}
        else ctx.body = {message: '设置用户为代理失败', code: 400}
    }


}

module.exports = BackendUser;
