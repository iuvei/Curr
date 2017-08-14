const md5 = require('md5');
const BrokerageModel = require('../../models/stat/brokerage.model');
const UserStatsModel = require('../../models/stat/userStats.model');

class BackendStat {

    // 创建反水
    static async createBrokerage(ctx) {
        const {createdAt, volume, brokerage } = ctx.request.body;
        console.log(ctx.request.body);
        if (!createdAt || !volume || !brokerage) return ctx.body = {message: '不能为空', code: 400}
        const isexit = await BrokerageModel.findOne({createdAt});
        if (isexit) return ctx.body = {message: `${createdAt}该期反水已存在`, code: 400}
        const result = await BrokerageModel.create({createdAt, volume, brokerage });
        if (result) return ctx.body = {code: 200, data: result}
        else ctx.body = {data: result, code: 400}
    }

    // 获取反水
    static async getAllBrokerageRecords(ctx) {
        var {pageSize, currPage, createdAt} = ctx.request.query;
        pageSize = (pageSize === undefined || Number(pageSize) < 0) ? 10 : Number(pageSize);
        currPage = (currPage === undefined || Number(currPage) < 0) ? 1 : Number(currPage);
        const query = {};
        if (createdAt !== undefined && createdAt !== '') {
            query.createdAt = createdAt
        }
        console.log(query,'===================')

        const users = await BrokerageModel.find(query).sort({"createdAt": -1}).skip((currPage - 1) * pageSize).limit(pageSize);
        if (!users) {
            return ctx.body = {message: '获取反水列表失败', code: 404}
        }
        const count = await BrokerageModel.find(query).count();
        return ctx.body = {code: 200, data: users, pageSize, currPage, total: Math.ceil(count/pageSize)}
    }


    // 创建用户统计记录
    static async createUserStat(ctx) {
        const {createdAt, username, avatar, income, outlay, worth } = ctx.request.body;
        console.log(ctx.request.body);
        if (!createdAt || !username) return ctx.body = {message: '不能为空', code: 400}
        const isexit = await UserStatsModel.findOne({createdAt, username});
        if (isexit) return ctx.body = {message: `${createdAt}的用户${username}已存在`, code: 400}
        const result = await UserStatsModel.create({createdAt, username, avatar, income, outlay, worth });
        if (result) return ctx.body = {code: 200, data: result}
        else ctx.body = {data: result, code: 400}
    }

    //获取用户统计记录
    static async getAllUserStats(ctx) {
        var {pageSize, currPage, startTime, endTime} = ctx.request.query;
        pageSize = (pageSize === undefined || Number(pageSize) < 0) ? 10 : Number(pageSize);
        currPage = (currPage === undefined || Number(currPage) < 0) ? 1 : Number(currPage);
        const query = {};

        const createdAt = {}
        if (startTime !== undefined && startTime !== '') {
            query.createdAt = createdAt
            createdAt['$gte'] = startTime
        }
        if (endTime !== undefined && endTime !== '') {
            query.createdAt = createdAt
            createdAt['$lt'] = endTime
        }

        console.log('=====getAllUserStats=======query:', query)
        const users = await UserStatsModel.find(query).sort({"_id": 1}).skip((currPage - 1) * pageSize).limit(pageSize);
        if (!users) {
            return ctx.body = {message: '获取用户统计失败', code: 404}
        }
        const count = await UserStatsModel.find(query).count();
        return ctx.body = {code: 200, data: users, pageSize, currPage, total: Math.ceil(count / pageSize)}
    }

    //获取平台统计记录
    static async getAllUserStats(ctx) {
        var {pageSize, currPage, startTime, endTime} = ctx.request.query;
        pageSize = (pageSize === undefined || Number(pageSize) < 0) ? 10 : Number(pageSize);
        currPage = (currPage === undefined || Number(currPage) < 0) ? 1 : Number(currPage);
        const query = {};

        const createdAt = {}
        if (startTime !== undefined && startTime !== '') {
            query.createdAt = createdAt
            createdAt['$gte'] = startTime
        }
        if (endTime !== undefined && endTime !== '') {
            query.createdAt = createdAt
            createdAt['$lt'] = endTime
        }

        console.log('=====getAllUserStats=======query:', query)
        const users = await UserStatsModel.find(query).sort({"_id": 1}).skip((currPage - 1) * pageSize).limit(pageSize);
        if (!users) {
            return ctx.body = {message: '获取用户统计失败', code: 404}
        }
        const count = await UserStatsModel.find(query).count();
        return ctx.body = {code: 200, data: users, pageSize, currPage, total: Math.ceil(count / pageSize)}
    }
}

module.exports = BackendStat;
