const KoaRouter = require('koa-router');
const router = new KoaRouter();
router.prefix('/api')  //路由前缀
const todosController = require('./../controllers/todos')
const objectivesController = require('./../controllers/objectives')
const keyresultsController = require('./../controllers/keyresults')
const okrController = require('./../controllers/okr')
const TodoKeyresultsController = require('./../controllers/todo_keyresults')
const usersController = require('./../controllers/users')
const authMiddleware = require('./../middlewares/user');

//login
router.post('/login', usersController.login)


//todo
router.post('/todos', todosController.insert)
router.put('/todos/:id', todosController.update)
router.delete('/todos/:id', todosController.delete)

//objectives
router.post('/objective')
router.put('/objective/:id',)

//keyresults
router.post('/keyresult', keyresultsController.insert)
router.put('/keyresult/:id', keyresultsController.update)
router.delete('/keyresult/:id', keyresultsController.delete)

//okr 
router.post('/okr', okrController.insert)
router.put('/okr/:id', okrController.update)
router.delete('/okr/:id', okrController.delete)

//todo_keyresults
router.post('/todo/:id/keyresult', TodoKeyresultsController.insert)
router.delete('/todo/:id/keyresult', TodoKeyresultsController.delete)

module.exports = router;