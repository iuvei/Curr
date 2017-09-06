const md5 = require('md5');
const BrokerageModel = require('../../models/stat/brokerage.model');
const UserStatsModel = require('../../models/stat/userStats.model');
const UserModel = require('../../models/user/user.model');
const QuizModel = require('../../models/quiz/quiz.model');
const TerraceStatsModel = require('../../models/stat/terraceStats.model');
const moment = require('moment');
class BackendStat {

    // 创建反水
    static async createBrokerage(ctx) {
        const {createdAt, volume, brokerage} = ctx.request.body;
        console.log(ctx.request.body);
        if (!createdAt || !volume || !brokerage) return ctx.body = {message: '不能为空', code: 400}
        const isexit = await BrokerageModel.findOne({createdAt});
        if (isexit) return ctx.body = {message: `${createdAt}该期反水已存在`, code: 400}
        const result = await BrokerageModel.create({createdAt, volume, brokerage});
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
        console.log(query, '===================')

        const users = await BrokerageModel.find(query).sort({"createdAt": -1}).skip((currPage - 1) * pageSize).limit(pageSize);
        if (!users) {
            return ctx.body = {message: '获取反水列表失败', code: 404}
        }
        const count = await BrokerageModel.find(query).count();
        return ctx.body = {code: 200, data: users, pageSize, currPage, total: Math.ceil(count / pageSize)}
    }


    // 创建用户统计记录
    static async createUserStat(ctx) {
        const {createdAt, username, avatar, income, outlay, worth} = ctx.request.body;
        console.log(ctx.request.body);
        if (!createdAt || !username) return ctx.body = {message: '不能为空', code: 400}
        const isexit = await UserStatsModel.findOne({createdAt, username});
        if (isexit) return ctx.body = {message: `${createdAt}的用户${username}已存在`, code: 400}
        const result = await UserStatsModel.create({createdAt, username, avatar, income, outlay, worth});
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

        const users = await UserStatsModel.find(query).sort({"_id": 1}).skip((currPage - 1) * pageSize).limit(pageSize);
        if (!users) {
            return ctx.body = {message: '获取用户统计失败', code: 404}
        }
        const count = await UserStatsModel.find(query).count();
        return ctx.body = {code: 200, data: users, pageSize, currPage, total: Math.ceil(count / pageSize)}
    }

    //获取平台统计记录
    static async getAllTerraceStats(ctx) {
        var {pageSize, currPage, startTime, endTime} = ctx.request.query;
        pageSize = (pageSize === undefined || Number(pageSize) < 0) ? 10 : Number(pageSize);
        currPage = (currPage === undefined || Number(currPage) < 0) ? 1 : Number(currPage);
        const query = {};
        const dateNo = {}
        if (startTime !== undefined && startTime !== '') {
            query.dateNo = dateNo
            dateNo['$gte'] = startTime
        }
        if (endTime !== undefined && endTime !== '') {
            query.dateNo = dateNo
            dateNo['$lt'] = endTime
        }

        const stats = await TerraceStatsModel.find(query).sort({"dateNo": 1}).skip((currPage - 1) * pageSize).limit(pageSize);
        if (!stats) {
            return ctx.body = {message: '获取平台统计失败', code: 404}
        }
        const count = await TerraceStatsModel.find(query).count();
        return ctx.body = {code: 200, data: stats, pageSize, currPage, total: Math.ceil(count / pageSize)}
    }

    //获取平台当天输赢
    static async getTerraceWorthByDay(ctx) {
        const today = moment().format('YYYY-MM-DD')
        const stats = await QuizModel.aggregate([
            {
                $match: {
                    opentime: {$regex: today},
                }
            },
            {
                $group: {
                    _id: null,
                    worth: {$sum: "$worth"}
                }
            }
        ]);

        if (!stats) {
            return ctx.body = {message: '获取当前平台输赢失败', code: 404}
        }
        return ctx.body = {code: 200, worth: stats[0].worth}
    }

    //获取平台最近一个月输赢
    static async getTerraceWorthByMonth(ctx) {
        const b30Day = moment().add(-30, 'day').format('YYYY-MM-DD')
        const stats = await TerraceStatsModel.aggregate([
            {
                $match: {
                    dateNo: {$gte: b30Day},
                }
            },
            {
                $group: {
                    _id: null,
                    worth: {$sum: "$worth"}
                }
            }
        ]);

        if (!stats) {
            return ctx.body = {message: '获取最近一个月平台输赢失败', code: 404}
        }
        return ctx.body = {code: 200, worth: stats[0].worth}
    }

    //获取平台当天新增用户数
    static async getTodayNewUsers(ctx) {
        const today = moment().startOf("day")
        const count = await UserModel.find({createdAt: {$gte: today}}).count()
        if (!count) {
            return ctx.body = {message: '获取当前新增用户数失败', code: 404}
        }
        return ctx.body = {code: 200, addUsers: count}
    }

    //获取平台最近一个月新增用户数
    static async getMonthNewUsers(ctx) {
        const b30Day = moment().add(-30, 'day').startOf("day")
        const count = await UserModel.find({createdAt: {$gte: b30Day}}).count()
        if (!count) {
            return ctx.body = {message: '获取当前新增用户数失败', code: 404}
        }
        return ctx.body = {code: 200, addUsers: count}
    }
}

module.exports = BackendStat;
