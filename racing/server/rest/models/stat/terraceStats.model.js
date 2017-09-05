const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//平台输赢
const TerraceStatsSchema = new Schema({
    dateNo: {type: String, required: true, index: true}, // 日期
    income: {type: Number, default: 0},  //进项
    outlay: {type: Number, default: 0}, //出项
    worth: {type: Number, default: 0}, //输赢
});

module.exports = mongoose.model('terrace_stat', TerraceStatsSchema);