const BackendSettings = require('../controllers/backend/settings');
const BackendUsers = require('../controllers/backend/user');

const BackendQuiz = require('../controllers/backend/quiz');
const BackendUpDowns = require('../controllers/backend/updowns');

const BackendStat = require('../controllers/backend/stat');

const BackendLottery =  require('../controllers/backend/lotterys');
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

    // 会员
    .get('/users', BackendUsers.getAllUsers)
    .post('/users', BackendUsers.createUser)

    .get('/agents', BackendUsers.getAllAgents)
    .post('/agents', BackendUsers.addAgent)

    // 竞猜
    .get('/quizs', BackendQuiz.getALlQuizs)
    .post('/quizs', BackendQuiz.createQuiz)

    // 竞猜
    .get('/updowns', BackendUpDowns.getALlUpDowns)
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
  
  // // 用户相关
  // .post('/server/login', BackendUser.signIn)                                   // 用户登录验证接口
  // .post('/server/user/create_user', BackendUser.create_user)                   // 添加管理员
  // .get('/server/signout', BackendUser.signOut)                                 // 退出登录
  // .get('/server/user', BackendMain.user)                                       // 用户管理主页
  //
  // // 文章相关
  // .get('/server/home', BackendMain.home)                                       // 管理后台主页
  // .get('/server/category', BackendMain.category)                               // 分类管理主页
  // .get('/server/article', BackendMain.article)                                 // 文章管理主页
  // .post('/server/article/create_tcate', BackendArticle.create_tcate)           // 创建一级分类
  // .post('/server/article/create_acate', BackendArticle.create_acate)           // 创建二级分类
  // .post('/server/article/put_tcate', BackendArticle.put_tcate)                 // 编辑一级分类
  // .post('/server/article/put_acate', BackendArticle.put_acate)                 // 编辑二级分类
  // .get('/server/article/delete_cate/:id', BackendArticle.delete_cate);         // 删除分类
  //

module.exports = router;





