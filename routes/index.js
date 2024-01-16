const KoaRouter = require('koa-router');
const router = new KoaRouter();
const todosController = require('./../controllers/todos')

router.get('/todos',todosController.show)

module.exports = router;