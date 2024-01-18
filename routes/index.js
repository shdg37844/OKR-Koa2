const KoaRouter = require('koa-router');
const router = new KoaRouter();
const todosController = require('./../controllers/todos')
const objectivesController = require('./../controllers/objectives')
const keyresultsController = require('./../controllers/keyresults')
const okrController = require('./../controllers/okr')

//todo
router.get('/todos',todosController.show)

//objectives
router.get('/objective', objectivesController.show)
//router.get('/objective/:id', objectivesController.showSomeItem)

//keyresults
router.get('/keyresult', keyresultsController.show)
//router.get('/keyresult/:id', keyresultsController.showSomeItem)

//okr
router.get('/okr/:id', okrController.showSomeItem)

module.exports = router;