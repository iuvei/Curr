var Settings = require('../../models/comm/settings');
const log4js = require('log4js')
const log = log4js.getLogger("settings")

class BackendSettings {
    //获取配置
    static async getSettings(ctx) {
        log.debug("getSetting")
        const settings = await Settings.findOne({type: "settings"});
        if (!settings) {
            return ctx.body = { message: '获取设置信息失败', code : 404 }
        }
        return ctx.body = {code: 200, data : settings}
    }

    // 设置配置
    static async setSettings(ctx) {
        log.debug("setSetting")
        const { name, nickname, password } = ctx.request.body;
        console.log(ctx.request.body);
        //if(!name||!password) return ctx.body = { message: '设置配置信息失败', status : 404 }
        const settings = await Settings.update({type : "settings"}, {'$set': {data: ctx.request.body}}, {upsert: true}, function (err, ret) {
            log.debug('====================', err , ret)
            if (err) {
                return ctx.body = { message: '获取设置信息失败', status : 404 }
            }
            if (!ret) {
                return ctx.body = { message: '获取设置信息失败', status : 404 }
            }
        });
        return ctx.body = {status: 200, data : settings}
    }
}

module.exports = BackendSettings;
