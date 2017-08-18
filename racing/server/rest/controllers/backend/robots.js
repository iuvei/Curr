const md5 = require('md5');
const RobotsModel = require('../../models/user/robots.model');
class BackendUser {

    // 成员
    static async createUser(ctx) {
        const {username, nickname, password} = ctx.request.body;
        console.log(ctx.request.body);
        if (!username || !password) return ctx.body = {message: '用户名密码为空', code: 400}
        const isexit = await RobotsModel.findOne({username});
        if (isexit) return ctx.body = {message: '用户名已存在', code: 400}
        const result = await RobotsModel.create({username, nickname, password: md5(password)});
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

        const users = await RobotsModel.find(query).sort({"_id": 1}).skip((currPage - 1) * pageSize).limit(pageSize);
        if (!users) {
            return ctx.body = {message: '获取设置信息失败', code: 404}
        }
        const count = await RobotsModel.find(query).count();
        return ctx.body = {code: 200, data: users, pageSize, currPage, total: Math.ceil(count/pageSize)}
    }
}

module.exports = BackendUser;
