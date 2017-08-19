
const moment = require('moment');

const BetModel = require('../../models/quiz/bet.model');

class IndexController {

    static getUserInfo(ctx) {
        //011bzcS61S00XQ1W8SP613cjS61bzcSh
        console.log(ctx.request.body, ctx.request.query)
        ctx.body = {code: 400, data : ctx.body}
    }

    static async auth(ctx) {
        //011bzcS61S00XQ1W8SP613cjS61bzcSh
        console.log(ctx.request.body, ctx.request.query)
        ctx.body = {code: 200, data : ctx.body}
    }

    static async getCurrent(ctx) {
        ctx.body = {code: 200, data : {no: "20170810"}}
    }
  
  // 获取下注消息
  static async getMessages(ctx) {
      const {no} =  ctx.request.query;
      const messages = await BetModel.find({no}).sort({"createdAt": -1});
      if (!messages) {
          return ctx.body = {message: '获取消息失败', code: 404}
      }
      ctx.body = {code: 200, data : messages}
  }
}

module.exports = IndexController;
