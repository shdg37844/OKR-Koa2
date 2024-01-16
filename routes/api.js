const KoaRouter = require('koa-router');
const router = new KoaRouter();
router.prefix('/api')  //路由前缀
const todosController = require('./../controllers/todos')

router.post('/todos', todosController.insert)
router.put('/todos/:id', todosController.update)
router.delete('/todos/:id', todosController.delete)


module.exports = router;