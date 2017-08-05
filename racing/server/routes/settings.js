const router = require('koa-router')()
const log4js = require('log4js')
const log = log4js.getLogger("index");

router.get('/', async (ctx, next) => {
  log.debug("Hello Koa 2!")
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

module.exports = router
