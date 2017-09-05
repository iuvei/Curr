const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//竞猜记录
const QuizSchema = new Schema({
    openid: {type: String, required: true,  index: true}, //用户ID
    no: {type: String, required: true,  index: true}, //期号
    nickname: {type: String, default: ''}, // 用户名
    choice: {type: String, required: true}, // 昵称
    avatar: {type: String, default: ''},    // 头像
    income: {type: Number, default: 0},  //进项
    outlay: {type: Number, default: 0}, //出项
    worth: {type: Number, default: 0}, //输赢
    opentime: {type: String, default: "",  index: true},
    createdAt: {type: Date, default: Date.now},
});

module.exports = mongoose.model('Quizs', QuizSchema);