const Koa = require('koa')
const app = new Koa()
const log4js = require('log4js')
const log = log4js.getLogger("app")
const serve = require('koa-static')
//const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')

const session = require('koa-session')
require('./rest/models/db')

//const { backendRouter } = require('./rest/index');

// error handler
onerror(app)

app.use(serve('../client/dist'));
app.use(serve('./public', {
    maxage: 1296000
}));

// cookies
app.keys = ['sven:secret']
const CONFIG = {
    key: 'sinn',
    maxAge: 604800000,  // 7天
    overwrite: true,
    httpOnly: false,
    signed: true
}

app.use(session(CONFIG, app))

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
// app.use(require('koa-static')(__dirname + '/public'))
//
// app.use(views(__dirname + '/views', {
//   extension: 'pug'
// }))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  log.debug(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes

//app.use(index.routes(), index.allowedMethods())
// app.use(users.routes(), users.allowedMethods())

const backendRouter = require('./rest/routes/backend');
app.use(backendRouter.routes(), backendRouter.allowedMethods())
//backend.jsapp.use(frontendRouter.routes(), frontendRouter.allowedMethods())

module.exports = app
