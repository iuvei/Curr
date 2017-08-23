const BackendSettings = require('../controllers/backend/settings');
const BackendUsers = require('../controllers/backend/user');
const BackendRobots = require('../controllers/backend/robots');

const BackendQuiz = require('../controllers/backend/quiz');
const BackendUpDowns = require('../controllers/backend/updowns');

const BackendStat = require('../controllers/backend/stat');

const BackendLottery = require('../controllers/backend/lotterys');
//import { BackendMain,BackendArticle,BackendUser, BackendSettings } from '../controllers/backend.export';
const router = require('koa-router')();
router.prefix('/api')
router
//.get('/', BackendMain.Index)

// 平台设置
    .get('/settings/platfrom', BackendSettings.getConfing)
    .post('/settings/platfrom', BackendSettings.setConfig)

    // 全局设置
    .get('/settings/race', BackendSettings.getRaceConfig)
    .post('/settings/race', BackendSettings.setRaceConfig)

    // 收款账户
    .get('/settings/payment', BackendSettings.getPayMentConfig)
    .post('/settings/payment', BackendSettings.setPayMentConfig)

    // 下注设置
    .get('/settings/betting', BackendSettings.getBettingConfig)
    .post('/settings/betting', BackendSettings.setBettingConfig)

    //用户
    .get('/users', BackendUsers.getAllUsers)
    .post('/users', BackendUsers.createUser)
    //获取账户
    .get('/users/account', BackendUsers.getAccount)

    // 机器人
    .get('/robots', BackendRobots.getAllUsers)
    .post('/robots', BackendRobots.createUser)

    .get('/agents', BackendUsers.getAllAgents)
    .post('/agents', BackendUsers.addAgent)

    // 竞猜
    .get('/quizs', BackendQuiz.getALlQuizs)
    .post('/quizs', BackendQuiz.createQuiz)

    // 竞猜
    .get('/updowns', BackendUpDowns.getAllUpDowns)
    .get('/updowns/counts', BackendUpDowns.getUpdownsCounts)
    .post('/updowns', BackendUpDowns.createUpDown)
    .get('/updowns/review', BackendUpDowns.getALlReviewUpDowns)

    // 统计
    .get('/stat/brokerages', BackendStat.getAllBrokerageRecords)
    .post('/stat/brokerages', BackendStat.createBrokerage)
    //.get('/stat/bonus', BackendStat.getALlReviewUpDowns)

    .get('/stat/lotterys', BackendLottery.getAllLotterysRecords)
    //.post('/stat/lotterys', BackendCrawler.create)

    .get('/stat/users', BackendStat.getAllUserStats)
    .post('/stat/users', BackendStat.createUserStat)


module.exports = router;





