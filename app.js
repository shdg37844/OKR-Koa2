require('dotenv').config()
const Koa = require('koa');
const app = new Koa();

const bodyParser = require('koa-bodyparser');
app.use(bodyParser());

//路由配置
const indexRouter = require('./routes/index');
const apiRouter = require('./routes/api');
app.use(indexRouter.routes(), indexRouter.allowedMethods());
app.use(apiRouter.routes(), apiRouter.allowedMethods());



app.listen(3000);

module.exports = app;