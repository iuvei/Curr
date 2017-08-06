/**
 * Created by sven on 2017/8/5.
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PaymentSchema = new Schema({
    type: {type: String, required: true},
    name: {type: String, required: true},
    img: {type: String},  // For wxPay/aliPay
    cardNo: {type: String}, //银行卡号 FOR  银联
    cardName: {type: String}, //银行开户名 FOR  银联
    cardBank: {type: String}, //银行开户行 FOR  银联
    createdAt: {type: Date, default: Date.now()},
    updatedAt: {type: Date, default: Date.now()}
});

module.exports = mongoose.model('Payment', PaymentSchema);