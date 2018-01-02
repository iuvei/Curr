const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//反水
const  BrokerageSchema = new Schema({
    volume: {type: Number, default: 0},  // 流水
    brokerage: {type: Number, default: 0}, //反水金额
    createdAt: {type: String, default: ''},
});

module.exports = mongoose.model('Brokerage', BrokerageSchema);