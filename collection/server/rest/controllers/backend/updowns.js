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

    //更新上下分记录
    static async updateUpDown(ctx) {
        const id = ctx.params.id;
        const {ignore, type, byWho} = ctx.request.body;
        if (ignore === 1) {
            const upDowns = await UpDownModel.findById(id);
            if (!upDowns) {
                return ctx.body = {message: '该记录不存在', code: 404}
            }
            const userid = upDowns.userid;
            const user = await UserModel.findOne({"_id": userid})
            if (!user) {
                return ctx.body = {message: '该用户不存在', code: 404}
            }
            var newBalance = user.balance;
            if (type === false) {
                if (upDowns.amount > user.balance) {
                    return ctx.body = {message: '请求金额大于用户余额', code: 404}
                } else {
                    newBalance = user.balance - upDowns.amount
                }
            } else {
                newBalance = user.balance + upDowns.amount
            }

            const query = {"_id": userid};
            if (user.balance !== 0) {
                query.balance = user.balance
            }

            const userRet = await UserModel.update(query, {'$set': {balance: newBalance}})

            if (userRet.nModified !== 1) {
                return ctx.body = {message: '更新用户余额失败', code: 404}
            }
        }

        const ret = await UpDownModel.update({_id: id}, {
            type,
            balance: newBalance || -1,
            ignore,
            byWho,
            updateAt: new Date()
        }, {upsert: false});

        if (ret.nModified !== 1) return ctx.body = {message: '更新上下分请求失败', code: 404}
        return ctx.body = {code: 200}
    }


    // 获取上下分记录
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
        query.byWho = {$exists: false} //查询未被审核的

        const upDowns = await UpDownModel.find(query).sort({"_id": 1}).skip((currPage - 1) * pageSize).limit(pageSize);
        if (!upDowns) {
            return ctx.body = {message: '获取设置信息失败', code: 404}
        }
        const count = await UpDownModel.find(query).count();

        for (var i = 0; i < upDowns.length; i++) { //获取账户余额
            const user = await UserModel.findOne({_id: upDowns[i].userid})
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

        const queryDowns = {
            type: false,
            byWho: null,
        }
        const downs = await UpDownModel.find(queryDowns).count();

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
        query.byWho = {$exists: true} //查询被审核的
        const updateAt = {}
        if (startTime !== undefined && startTime !== '') {
            query.updatedAt = updateAt
            updateAt['$gte'] = new Date(startTime)
        }
        if (endTime !== undefined && endTime !== '') {
            query.updatedAt = updateAt
            updateAt['$lt'] = new Date(endTime)
        }

        const users = await UpDownModel.find(query).sort({"_id": 1}).skip((currPage - 1) * pageSize).limit(pageSize);
        if (!users) {
            return ctx.body = {message: '获取上下分审核列表失败', code: 404}
        }
        const count = await UpDownModel.find(query).count();
        return ctx.body = {code: 200, data: users, pageSize, currPage, total: Math.ceil(count / pageSize)}
    }
}

module.exports = BackendUpDown;
