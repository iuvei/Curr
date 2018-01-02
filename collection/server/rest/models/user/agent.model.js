const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AgentSchema = new Schema({
    openid:{type: String, required: true}, //用户ID
    nickname: {type: String, required: true}, // 昵称
    avatar: {type: String, default: ''},    // 头像
    numUsers: {type: Number, default: 0},   // 推荐人数
    brokerage: {type: Number, default: 0},
    proxyImg: {type: String},
    status: {type: Boolean, required: true},
    createdAt: {type: Date, default: Date.now},
});

module.exports = mongoose.model('Agent', AgentSchema);