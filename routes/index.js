const KoaRouter = require('koa-router');
const router = new KoaRouter();
const todosController = require('./../controllers/todos')
const objectivesController = require('./../controllers/objectives')
const keyresultsController = require('./../controllers/keyresults')
const okrController = require('./../controllers/okr')
const TodoKeyresultsController = require('./../controllers/todo_keyresults')
const authMiddleware = require('./../middlewares/user');

//todo
router.get('/todos', todosController.show)

//objectives
router.get('/objective',  objectivesController.show)

//keyresults
router.get('/keyresult',  keyresultsController.show)

//okr
router.get('/okr/:id',okrController.showSomeItem)

//todo_keyresults
router.get('/todo/:id/keyresult', TodoKeyresultsController.showActive)
router.get('/todo/keyresult',  TodoKeyresultsController.showTodos)

module.exports = router;