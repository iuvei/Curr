const md5 = require('md5');
const QuizModel = require('../../models/quiz/quiz.model');

class BackendQuiz {

    // 成员
    static async createQuiz(ctx) {
        const {no, username, choice, avatar, income, outlay, worth, balance} = ctx.request.body;
        console.log(ctx.request.body);
        if (!no || !username || !choice) return ctx.body = {message: '不能为空', code: 400}
        const isexit = await QuizModel.findOne({no, username, choice});
        if (isexit) return ctx.body = {message: '该期已存在', code: 400}
        const result = await QuizModel.create({no, username, choice, avatar, income, outlay, worth, balance});
        if (result) return ctx.body = {code: 200, data: result}
        else ctx.body = {data: result, code: 400}
    }

    // 成员
    static async getALlQuizs(ctx) {
        var {pageSize, currPage, no, username} = ctx.request.query;
        pageSize = (pageSize === undefined || Number(pageSize) < 0) ? 10 : Number(pageSize);
        currPage = (currPage === undefined || Number(currPage) < 0) ? 1 : Number(currPage);
        const query = {};
        if (no !== undefined && no !== '') {
            query.no = {'$regex': eval(`/${no}.*/i`)}
        }
        if (username !== undefined && username !== '') {
            query.username = {'$regex': eval(`/${username}.*/i`)}
        }

        console.log(query,'===================')

        const users = await QuizModel.find(query).sort({"_id": 1}).skip((currPage - 1) * pageSize).limit(pageSize);
        if (!users) {
            return ctx.body = {message: '获取设置信息失败', code: 404}
        }
        const count = await QuizModel.find({}).count();
        return ctx.body = {code: 200, data: users, pageSize, currPage, total: Math.ceil(count/pageSize)}
    }
}

module.exports = BackendQuiz;
