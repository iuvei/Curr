const Index = require('../controllers/frontend/index');
const Settings = require('../controllers/backend/settings');
const Users = require('../controllers/frontend/user');
const router = require('koa-router')();
router.prefix('/api')
router

//获取appid
    .get('/config', Index.getConfig)

    //live
    .get('/live', Index.getLive)

    //获取公告
    .get('/announcement', Index.getAnnouncement)
    //获取用户信息
    .get('/userinfo', Index.getUserInfo)
    //获取客服微信图片
    .get('/getCustomerImg', Settings.getGrameConfig)
    //微信网页授权
    .get('/auth', Index.auth)

    .post('/users/register', Users.register)
    .post('/users/login', Users.login)
    .get('/users/:userid', Index.getUserDetail)

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

    //交易记录，即下注记录
    .get('/quizs/:openid', Index.getQuizRecords)

    .get('/lotterys', Index.getLotterys)


module.exports = router;





