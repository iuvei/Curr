const Index = require('../controllers/frontend/index');

const router = require('koa-router')();
router.prefix('/api')
router
  //.get('/', BackendMain.Index)

  // 平台设置
    .get('/current', Index.getCurrent)

    .get('/messages', Index.getMessages)

module.exports = router;





