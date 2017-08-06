const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {type: String, required: true}, // 用户名
    nickname: {type: String, required: true}, // 昵称
    enable: {type: Boolean, default: false},
    gender: {type: Boolean, default: false},
    avatar: {type: String, default: ''},    // 头像
    profile: {type: String, default: ''},   // 个人简介
    playpoint: {type: Number, default: 0},
    rebatepoint: {type: Number, default: 0},
    password: {type: String, required: true},
    createdAt: {type: Date, default: Date.now},
});

module.exports = mongoose.model('User', UserSchema);