const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Changlong
const ChanglongSchema = new Schema({
    day: {type: String, required: true }, //日期
    type: {type: String}, // 类型
    m: {type: Object}, // 长龙数据
});

ChanglongSchema.index({ day: -1, type: 1 });

module.exports = mongoose.model('changlong', ChanglongSchema);