const TodoKeyresultModel = require('../models/todo_keyresults')
const TodoKeyresult = new TodoKeyresultModel()
const keyresultModel = require('../models/keyresults')
const Keyresult = new keyresultModel()
const todoModel = require('../models/todos')
const Todo = new todoModel()

const TodoKeyresultsController = {
    insert: async function (ctx, next) {
        let todo_id = ctx.request.body.todo_id;
        let kr_id = ctx.request.body.kr_id;

        try {
            const insertId = await TodoKeyresult.insert({ todo_id, kr_id })
            ctx.body = { code: 200, data: insertId }
        } catch (e) {
            console.error(e);
            ctx.body = { code: 0, data: e }
        }
    },
    delete: async function (ctx, next) {
        let associationId = ctx.request.body.associationId
        //console.log('associationId:', associationId)

        try {
            const todo = await TodoKeyresult.delete(associationId)
            //console.log('删掉的内容', todo)
            ctx.body = { code: 200, data: todo }
        } catch (e) {
            console.error(e);
            ctx.body = { code: 0, data: e }
        }
    },
    showActive: async function (ctx, next) {
        try {
            let todoId = ctx.params.id;
            let objId = ctx.query.obj_id;
            let allData = await Keyresult.select({ objective_id: objId });
            let relateItemArray = await TodoKeyresult.select({ todo_id: todoId });


            let KRs = allData.map(kr => {
                let relatedItem = relateItemArray.find(item => parseInt(item.kr_id) === kr.id);
                //数据类型不同，会造成结果不相同。字符串和数字不相同

                return {
                    ...kr,
                    active: relatedItem ? true : false,
                    associationId: relatedItem ? relatedItem.id : null
                }
            })
            ctx.body = { code: 200, data: KRs }
        } catch (e) {
            console.error(e);
            ctx.body = { code: 0, data: e }
        }

    },
    // showTodos: async function (ctx, next) {
    //     try {
    //         let krIds = ctx.query.krIds
    //         let results = await TodoKeyresult.selectArray('kr_id', krIds);

    //         let todos = [];
    //         for (const result of results) {
    //             let todoResult = await Todo.select({ id: result.todo_id }); 
    //             if (todoResult && todoResult.length > 0) {
    //                 let todo = todoResult[0];
    //                 todo.kr_id = result.kr_id; 
    //                 todos.push(todo); 
    //             }
    //         }

    //         // console.log('resultsss',results)
    //         // console.log('todosIdssss', todoIds)
    //         // console.log('todoss', todos)


    //         ctx.body = { code: 200, data: todos }
    //     } catch (e) {
    //         console.error(e);
    //         ctx.body = { code: 0, data: e }
    //     }

    // },

    Todos: async function (ctx, next) {
        let kr_ids = ctx.request.body.kr_ids
        //console.log('krrrridd',kr_ids)

        let selectedtodos = await Todo.selectTodos(kr_ids);
        //console.log('selectedtodossssss', selectedtodos)

        try { 

            ctx.body = { code: 200, data: selectedtodos }
        } catch (e) {
            console.error(e);
            ctx.body = { code: 0, data: e }
        }
    },




}

module.exports = TodoKeyresultsController

