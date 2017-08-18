const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//竞猜记录
const QuizSchema = new Schema({
    no: {type: String, required: true}, //期号
    username: {type: String, required: true}, // 用户名
    choice: {type: String, required: true}, // 昵称
    avatar: {type: String, default: ''},    // 头像
    income: {type: Number, default: 0},  //进项
    outlay: {type: Number, default: 0}, //出项
    worth: {type: Number, default: 0}, //输赢
    balance:  {type: Number, default: 0}, //余额
    createdAt: {type: Date, default: Date.now},
});

module.exports = mongoose.model('Quiz', QuizSchema);