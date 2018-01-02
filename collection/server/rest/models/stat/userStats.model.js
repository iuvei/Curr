const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//用户输赢统计
const UserStatsSchema = new Schema({
    openid:{type: String, required: true,  index: true}, //用户ID
    dateNo: {type: String, required: true,  index: true}, // 日期
    nickname: {type: String, default:''}, // 用户名
    avatar: {type: String, default: ''},    // 头像
    income: {type: Number, default: 0},  //进项
    outlay: {type: Number, default: 0}, //出项
    worth: {type: Number, required: 0}, //输赢
});

module.exports = mongoose.model('users_stat', UserStatsSchema);