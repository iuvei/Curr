const md5 = require('md5');
const UpDownModel = require('../../models/quiz/upDown.model');

class BackendUpDown {
    // 成员
    static async createUpDown(ctx) {
        const {username, avatar, type, amount, balance, backMethod, backNo, byWho, profile, createdAt, updateAt} = ctx.request.body;
        console.log(ctx.request.body);
        if (!username || !amount || amount < 0) return ctx.body = {message: '用户名和上/下分不能为空,且金额大于0', code: 400}
        const result = await UpDownModel.create({username, avatar, type, amount, balance, backMethod, backNo, byWho, profile});
        if (result) return ctx.body = {code: 200, data: result}
        else ctx.body = {data: result, code: 400}
    }

    // 成员
    static async getALlUpDowns(ctx) {
        var {pageSize, currPage, username, type} = ctx.request.query;
        if (type === undefined || (type!== 'true' && type!=='false')) return ctx.body = {message: 'type is required', code: 400}
        pageSize = (pageSize === undefined || Number(pageSize) < 0) ? 10 : Number(pageSize);
        currPage = (currPage === undefined || Number(currPage) < 0) ? 1 : Number(currPage);
        const query = {type:type==="true"};
        if (username !== undefined && username !== '') {
            query.username = {'$regex': eval(`/${username}.*/i`)}
        }

        const users = await UpDownModel.find(query).sort({"_id": 1}).skip((currPage - 1) * pageSize).limit(pageSize);
        if (!users) {
            return ctx.body = {message: '获取设置信息失败', code: 404}
        }
        const count = await UpDownModel.find(query).count();
        return ctx.body = {code: 200, data: users, pageSize, currPage, total: Math.ceil(count / pageSize)}
    }

    // 上下分审核
    static async getALlReviewUpDowns(ctx) {
        var {pageSize, currPage, username, startTime, endTime} = ctx.request.query;
        pageSize = (pageSize === undefined || Number(pageSize) < 0) ? 10 : Number(pageSize);
        currPage = (currPage === undefined || Number(currPage) < 0) ? 1 : Number(currPage);
        const query = {};
        if (username !== undefined && username !== '') {
            query.username = {'$regex': eval(`/${username}.*/i`)}
        }
        const updateAt = {}
        if (startTime !== undefined && startTime !== '') {
            query.updatedAt = updateAt
            updateAt['$gte'] = new Date(startTime)
        }
        if (endTime !== undefined && endTime !== '') {
            query.updatedAt = updateAt
            updateAt['$lt'] = new Date(endTime)
        }

        console.log('======getALlReviewUpDowns=======query:', query)
        const users = await UpDownModel.find(query).sort({"_id": 1}).skip((currPage - 1) * pageSize).limit(pageSize);
        if (!users) {
            return ctx.body = {message: '获取设置信息失败', code: 404}
        }
        const count = await UpDownModel.find(query).count();
        return ctx.body = {code: 200, data: users, pageSize, currPage, total: Math.ceil(count / pageSize)}
    }
}

module.exports = BackendUpDown;
