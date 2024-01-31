const KoaRouter = require('koa-router');
const router = new KoaRouter();
const todosController = require('./../controllers/todos')
const objectivesController = require('./../controllers/objectives')
const keyresultsController = require('./../controllers/keyresults')
const okrController = require('./../controllers/okr')
const TodoKeyresultsController = require('./../controllers/todo_keyresults')
const authMiddleware = require('../middlewares/user');

//todo
router.get('/todos', authMiddleware.checkToken, todosController.show)

//objectives
router.get('/objective', authMiddleware.checkToken, objectivesController.show)

//keyresults
router.get('/keyresult', authMiddleware.checkToken, keyresultsController.show)

//okr
router.get('/okr/:id', authMiddleware.checkToken, okrController.showSomeItem)

//todo_keyresults
router.get('/todo/:id/keyresult', authMiddleware.checkToken, TodoKeyresultsController.showActive)




module.exports = router;