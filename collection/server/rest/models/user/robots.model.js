const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RobotsSchema = new Schema({
    nickname: {type: String, required: true}, // 昵称
    avatar: {type: String, default: ''},    // 头像
    createdAt: {type: Date, default: Date.now},
});

module.exports = mongoose.model('Robots', RobotsSchema);