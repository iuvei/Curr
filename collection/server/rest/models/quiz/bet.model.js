const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//游戏下注
const BetsSchema = new Schema({
    from: {type: Number, required: true}, //类型 1：用户 2：管理员 3：机器人
    userid: {type: String, required: true}, //用户ID
    no: {type: Number, required: true}, //期号
    nickname: {type: String, default: ''}, // 用户名
    avatar: {type: String, default: ''},    // 头像
    game: {type: String, required: true},//游戏类型
    method: {type: Number}, //游戏的玩法
    choice: {type: Object, required: true}, // 下注
    amount: {type: Number, default: 0},  //金额
    dealed: {type: Boolean, default: false},
    createdAt: {type: Date, default: Date.now},
});

module.exports = mongoose.model('Bets', BetsSchema);