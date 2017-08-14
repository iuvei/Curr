const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Crawler
const LotterySchema = new Schema({
    no: {type: String, required: true }, //期号
    name: {type: String}, // 类型，名称
    code: {type: String}, // 昵称
    createdAt: {type: String},
});

LotterySchema.index({ no: 1, type: -1 });

module.exports = mongoose.model('lotterys', LotterySchema);