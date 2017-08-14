const md5 = require('md5');
const UserModel = require('../../models/user/user.model');
const AgentModel = require('../../models/user/agent.model');
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
        return ctx.body = {code: 200, data: users, pageSize, currPage, total: Math.ceil(count/pageSize)}
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

    // 成员
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

    // 成员
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
        const count = await AgentModel.find(query).count();
        return ctx.body = {code: 200, data: users, pageSize, currPage, total: Math.ceil(count/pageSize)}
    }

}

module.exports = BackendUser;
