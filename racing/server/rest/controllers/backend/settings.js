var Settings = require('../../models/comm/settings');
var Payment = require('../../models/comm/payment');
const log4js = require('log4js')
const log = log4js.getLogger("settings")

class BackendSettings {

    //获取平台配置
    static async getConfing(ctx) {
        log.debug("getConfing")
        const data = await Settings.findOne({type: "platfrom"});
        console.log(data)
        if (!data) {
            return ctx.body = { message: '获取设置信息失败', code : 404 }
        }
        return ctx.body = {code: 200, data}
    }

    // 设置平台配置
    static async setConfig(ctx) {
        log.debug("setConfig")
        console.log(ctx.request.body);
        const settings = await Settings.update({type : "platfrom"}, {type : "platfrom", config: ctx.request.body}, {upsert: true});
        return ctx.body = {code: 200, data : settings}
    }

    //获取赛车配置
    static async getRaceConfig(ctx) {
        log.debug("getSetting")
        const data = await Settings.findOne({type: "race"});
        console.log(data)
        if (!data) {
            return ctx.body = { message: '获取设置信息失败', code : 404 }
        }
        return ctx.body = {code: 200, data : data}
    }

    // 设置赛车配置
    static async setRaceConfig(ctx) {
        log.debug("setSetting")
        console.log(ctx.request.body);
        const settings = await Settings.update({type : "race"}, {type : "race", config: ctx.request.body}, {upsert: true});
        return ctx.body = {code: 200, data : settings}
    }


    //获取下注配置
    static async getBettingConfig(ctx) {
        log.debug("getSetting")
        const data = await Settings.findOne({type: "betting"});
        console.log(data)
        if (!data) {
            return ctx.body = { message: '获取设置信息失败', code : 404 }
        }
        return ctx.body = {code: 200, config : data.config}
    }

    // 设置下注配置
    static async setBettingConfig(ctx) {
        log.debug("setSetting")
        console.log(ctx.request.body);
        const settings = await Settings.update({type : "betting"}, {type : "betting", config: ctx.request.body}, {upsert: true});
        return ctx.body = {code: 200, data : settings}
    }


    //获取支付方式
    static async getPayMentConfig(ctx) {
        log.debug("getPayMentConfig")
        var {type} = ctx.request.query;
        const config = await Payment.findOne({type});
        console.log(config)
        if (!config) {
            return ctx.body = { message: '获取支付方式失败', code : 404 }
        }
        return ctx.body = {code: 200, config : config}
    }

    // 设置支付方式
    static async setPayMentConfig(ctx) {
        log.debug("setPayMentConfig")

        const {type, name, img, cardNo, cardName, cardBank} = ctx.request.body;
        console.log(type, name, img, cardNo, cardName, cardBank);
        if (type!=="WXPAY" && type !=="ALIPAY" && type!=="UPPAY" ){
            return ctx.body = { message: '平台只支持类型：WXPAY、ALIPAY、UPPAY', code : 400 }
        }

        const updateDoc = {type};

        if(type === "WXPAY") {
            updateDoc.name = "微信支付";
            updateDoc.img = img;
        }
        if(type === "ALIPAY") {
            updateDoc.name = "支付宝支付";
            updateDoc.img = img;
        }

        if(type === "UPPAY") {
            updateDoc.name = "银行卡转账";
            updateDoc.cardNo = cardNo;
            updateDoc.cardName = cardName;
            updateDoc.cardBank = cardBank;
        }

        const data = await Payment.update({type}, updateDoc, {upsert: true});
        return ctx.body = {code: 200, data }
    }
}

module.exports = BackendSettings;
