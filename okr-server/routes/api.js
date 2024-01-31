const KoaRouter = require('koa-router');
const router = new KoaRouter();
router.prefix('/api')  //路由前缀
const todosController = require('./../controllers/todos')
const objectivesController = require('./../controllers/objectives')
const keyresultsController = require('./../controllers/keyresults')
const okrController = require('./../controllers/okr')
const TodoKeyresultsController = require('./../controllers/todo_keyresults')
const usersController = require('./../controllers/users')
const authMiddleware = require('../middlewares/user');

//login
router.post('/login', usersController.login)

//todo
router.post('/todos', authMiddleware.checkToken, todosController.insert)
router.put('/todos/:id', authMiddleware.checkToken, todosController.update)
router.delete('/todos/:id', authMiddleware.checkToken, todosController.delete)

//objectives
router.post('/objective', authMiddleware.checkToken,)
router.put('/objective/:id', authMiddleware.checkToken,)

//keyresults
router.post('/keyresult', authMiddleware.checkToken, keyresultsController.insert)
router.put('/keyresult/:id', authMiddleware.checkToken, keyresultsController.update)
router.delete('/keyresult/:id', authMiddleware.checkToken, keyresultsController.delete)

//okr
router.post('/okr', authMiddleware.checkToken, okrController.insert)
router.put('/okr/:id', authMiddleware.checkToken, okrController.update)
router.delete('/okr/:id', authMiddleware.checkToken, okrController.delete)

//todo_keyresults
router.post('/todo/:id/keyresult', authMiddleware.checkToken, TodoKeyresultsController.insert)
router.delete('/todo/:id/keyresult', authMiddleware.checkToken, TodoKeyresultsController.delete)
router.post('/todo/keyresult', authMiddleware.checkToken, TodoKeyresultsController.Todos)






module.exports = router;