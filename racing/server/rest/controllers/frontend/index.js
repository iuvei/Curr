
const moment = require('moment');

const BetModel = require('../../models/quiz/bet.model');

class IndexController {

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
