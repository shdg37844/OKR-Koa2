const KoaRouter = require('koa-router');
const router = new KoaRouter();
router.prefix('/api')  //路由前缀
const todosController = require('./../controllers/todos')
const objectivesController = require('./../controllers/objectives')
const keyresultsController = require('./../controllers/keyresults')
const okrController = require('./../controllers/okr')



//todo
router.post('/todos', todosController.insert)
router.put('/todos/:id', todosController.update)
router.delete('/todos/:id', todosController.delete)

//objectives
router.post('/objective', todosController.insert)

//keyresults
router.post('/todos', todosController.insert)

//okr 
router.post('/okr', okrController.insert)

module.exports = router;