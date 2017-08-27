const Index = require('../controllers/frontend/index');
const Settings = require('../controllers/backend/settings');
const router = require('koa-router')();
router.prefix('/api')
router

//获取appid
    .get('/config', Index.getConfig)
    //获取用户信息
    .get('/userinfo', Index.getUserInfo)
    //获取客服微信图片
    .get('/getCustomerImg', Settings.getRaceConfig)
    //微信网页授权
    .get('/auth', Index.auth)

    //获取开奖信息
    .get('/lotterys/current', Index.getCurrLottery)
    //获取账户
    .get('/account', Index.getAccount)

    .get('/settings/payment', Settings.getPayMentConfig)

    //获取下注消息列表
    .get('/messages', Index.getMessages)

    //上线分
    .post('/up', Index.createUp)
    .post('/down', Index.createDown)
    //充值记录，即上下分记录
    .get('/updowns/:openid', Index.getRechargeRecords)

    .get('/lotterys', Index.getLotterys)


module.exports = router;





