const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//竞猜记录
const BetsSchema = new Schema({
    from: {type: Number, required: true}, //类型 1：用户 2：管理员 3：机器人
    openid: {type: String, required: true}, //用户ID
    no: {type: Number, required: true}, //期号
    nickname: {type: String, default: ''}, // 用户名
    avatar: {type: String, default: ''},    // 头像
    choice: {type: String, required: true}, // 昵称
    amount: {type: Number, default: 0},  //金额
    createdAt: {type: Date, default: Date.now},
});

module.exports = mongoose.model('Bets', BetsSchema);