const imageUploader = require("../../tools/imageUploader");
const RobotsModel = require('../../models/user/robots.model');
class BackendUser {

    // 增加机器人
    static async createRobot(ctx) {
        const {nickname, avatar} = ctx.request.body;
        console.log(ctx.request.body);
        if (!nickname || !avatar) return ctx.body = {message: '昵称和头像不能为空', code: 400}
        // const imgUrl = imageUploader.upload(photo)
        // console.log('==imgUrl==', imgUrl)
        const result = await RobotsModel.create({nickname, avatar});
        if (result) return ctx.body = {code: 200}
        else ctx.body = {message: "添加机器人失败", code: 400}
    }

    // 编辑机器人
    static async editRobot(ctx) {
        const id = ctx.params.id;
        const {nickname, avatar} = ctx.request.body;
        console.log(ctx.request.body);
        if (!nickname || !avatar) return ctx.body = {message: '昵称和头像不能为空', code: 400}

        const ret = await RobotsModel.update({_id: id}, {
            nickname,
            avatar,
        }, {upsert: false});

        if (ret.nModified !== 1) return ctx.body = {message: '修改机器人失败', code: 404}
        return ctx.body = {code: 200}
    }

    // 编辑机器人
    static async deleteRobot(ctx) {
        const id = ctx.params.id;
        const ret = await RobotsModel.remove({_id: id});
        if (!ret) return ctx.body = {message: '删除机器人失败', code: 404}
        return ctx.body = {code: 200}
    }

    // 查询机器人
    static async getAllRobots(ctx) {
        var {pageSize, currPage, nickname} = ctx.request.query;
        pageSize = (pageSize === undefined || Number(pageSize) < 0) ? 10 : Number(pageSize);
        currPage = (currPage === undefined || Number(currPage) < 0) ? 1 : Number(currPage);
        const query = {};
        if (nickname !== undefined && nickname !== '') {
            query.nickname = {'$regex': eval(`/${nickname}.*/i`)}
        }
        console.log(query)
        const users = await RobotsModel.find(query).sort({"_id": -1}).skip((currPage - 1) * pageSize).limit(pageSize);
        if (!users) {
            return ctx.body = {message: '获取设置信息失败', code: 404}
        }
        const count = await RobotsModel.find(query).count();
        return ctx.body = {code: 200, data: users, pageSize, currPage, total: Math.ceil(count / pageSize)}
    }
}

module.exports = BackendUser;
