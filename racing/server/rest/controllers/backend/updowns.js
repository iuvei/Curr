const md5 = require('md5');
const UpDownModel = require('../../models/quiz/upDown.model');
const UserModel = require('../../models/user/user.model');
class BackendUpDown {
    //上线分，仅后端测试
    static async createUpDown(ctx) {
        const {nickname, avatar, type, amount, balance, backMethod, backNo, byWho, profile, createdAt, updateAt} = ctx.request.body;
        console.log(ctx.request.body);
        if (!nickname || !amount || amount < 0) return ctx.body = {message: '用户名和上/下分不能为空,且金额大于0', code: 400}
        const result = await UpDownModel.create({
            nickname,
            avatar,
            type,
            amount,
            balance,
            backMethod,
            backNo,
            byWho,
            profile
        });
        if (result) return ctx.body = {code: 200, data: result}
        else ctx.body = {data: result, code: 400}
    }

    // 成员
    static async getAllUpDowns(ctx) {
        var {pageSize, currPage, nickname, type} = ctx.request.query;
        if (type === undefined || (type !== 'true' && type !== 'false')) return ctx.body = {
            message: 'type is required',
            code: 400
        }
        pageSize = (pageSize === undefined || Number(pageSize) < 0) ? 10 : Number(pageSize);
        currPage = (currPage === undefined || Number(currPage) < 0) ? 1 : Number(currPage);
        const query = {type: type === "true"};
        if (nickname !== undefined && nickname !== '') {
            query.nickname = {'$regex': eval(`/${nickname}.*/i`)}
        }

        const upDowns = await UpDownModel.find(query).sort({"_id": 1}).skip((currPage - 1) * pageSize).limit(pageSize);
        if (!upDowns) {
            return ctx.body = {message: '获取设置信息失败', code: 404}
        }
        const count = await UpDownModel.find(query).count();

        for (var i = 0; i < upDowns.length; i++) { //获取账户余额
            const user = await UserModel.findOne({openid: upDowns[i].openid})
            upDowns[i].balance = user.balance;
        }
        return ctx.body = {code: 200, data: upDowns, pageSize, currPage, total: Math.ceil(count / pageSize)}
    }

    // 统计上/下分请求
    static async getUpdownsCounts(ctx) {
        const queryUps = {
            type: true,
            byWho: null,
        }
        const ups = await UpDownModel.find(queryUps).count();
        if (!ups) {
            return ctx.body = {message: '获取上分请求数失败', code: 404}
        }

        const queryDowns = {
            type: false,
            byWho: null,
        }
        const downs = await UpDownModel.find(queryDowns).count();

        if (!downs) {
            return ctx.body = {message: '获取下分分请求数失败', code: 404}
        }

        return ctx.body = {code: 200, ups, downs}
    }



    // 上下分审核
    static async getALlReviewUpDowns(ctx) {
        var {pageSize, currPage, nickname, startTime, endTime} = ctx.request.query;
        pageSize = (pageSize === undefined || Number(pageSize) < 0) ? 10 : Number(pageSize);
        currPage = (currPage === undefined || Number(currPage) < 0) ? 1 : Number(currPage);
        const query = {};
        if (nickname !== undefined && nickname !== '') {
            query.nickname = {'$regex': eval(`/${nickname}.*/i`)}
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
