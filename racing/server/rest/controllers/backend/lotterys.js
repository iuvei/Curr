const md5 = require('md5');
const CrawlerModel = require('../../models/quiz/lottery.model.js');
const QuizModel = require('../../models/quiz/quiz.model');
class BackendCrawler {

    // 成员
    static async create({no, name, code ,createdAt }) {
        console.log(no, name, code ,createdAt);
        if (!no || !code) return {message: '不能为空', code: 400}

        try{
            const isexit = await CrawlerModel.findOne({no, name}).catch((err)=>console.log(err))
            console.log('==000==', isexit)
            if (isexit) return {message: `${name}:${no} 该期反水已存在`, code: 400}

            const result = await CrawlerModel.create({no, name, code ,createdAt});
            console.log('====', result)
            if (result) return {code: 200, data: result}
            else return {data: result, code: 400}
        }catch (err){
            console.log(err)
        }

    }

    // 成员
    static async getAllLotterysRecords(ctx) {
        var {pageSize, currPage, no} = ctx.request.query;
        pageSize = (pageSize === undefined || Number(pageSize) < 0) ? 10 : Number(pageSize);
        currPage = (currPage === undefined || Number(currPage) < 0) ? 1 : Number(currPage);
        const query = {};
        if (no !== undefined && no !== '') {
            query.no = no
        }
        console.log(query,'===================')

        const users = await CrawlerModel.find(query)//.sort({"no": -1}).skip((currPage - 1) * pageSize).limit(pageSize);
        if (!users) {
            console.log(users)
            return ctx.body = {message: '获取彩票列表失败', code: 404}
        }
        const count = await CrawlerModel.find(query).count();
        return ctx.body = {code: 200, data: users, pageSize, currPage, total: Math.ceil(count/pageSize)}
    }
}

module.exports = BackendCrawler;
