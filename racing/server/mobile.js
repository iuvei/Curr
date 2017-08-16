const Koa = require('koa')
const mobile = new Koa()
const log4js = require('log4js')
const log = log4js.getLogger("mobile")
const serve = require('koa-static')
//const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
mobile.use(bodyparser({jsonLimit: "10mb"}));

const session = require('koa-session')
require('./rest/models/db')

// error handler
onerror(mobile)

mobile.use(serve('../client/dist'));
mobile.use(serve('./public', {
    maxage: 1296000
}));

// cookies
mobile.keys = ['sven:secret']
const CONFIG = {
    key: 'sinn',
    maxAge: 604800000,  // 7天
    overwrite: true,
    httpOnly: false,
    signed: true
}

mobile.use(session(CONFIG, mobile))

// middlewares
mobile.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
mobile.use(json())
// app.use(require('koa-static')(__dirname + '/public'))
//
// app.use(views(__dirname + '/views', {
//   extension: 'pug'
// }))

// logger
mobile.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  log.debug(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes

//app.use(index.routes(), index.allowedMethods())
// app.use(users.routes(), users.allowedMethods())

const backendRouter = require('./rest/routes/backend');
mobile.use(backendRouter.routes(), backendRouter.allowedMethods())
//backend.jsapp.use(frontendRouter.routes(), frontendRouter.allowedMethods())

module.exports = mobile
