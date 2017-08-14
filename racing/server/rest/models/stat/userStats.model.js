const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//竞猜记录
const UserStatsSchema = new Schema({
    username: {type: String, required: true}, // 用户名
    avatar: {type: String, default: ''},    // 头像
    income: {type: Number, default: 0},  //进项
    outlay: {type: Number, default: 0}, //出项
    worth: {type: Number, required: 0}, //输赢
    createdAt: {type: String},
});

module.exports = mongoose.model('users_stat', UserStatsSchema);