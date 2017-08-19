const Index = require('../controllers/frontend/index');
const Settings = require('../controllers/backend/settings');
const router = require('koa-router')();
router.prefix('/api')
router

  // 平台设置
    .get('/userinfo', Index.getUserInfo)
    .get('/getCustomerImg', Settings.getRaceConfig)
    //微信网页授权
    .get('/auth', Index.auth)


    .get('/messages', Index.getMessages)

module.exports = router;





