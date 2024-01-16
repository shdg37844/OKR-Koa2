const todoModel = require('./../models/todos')
const Todo = new todoModel()

const todosController = {
    show: async function (ctx, next) {
        try {
            let todos = await Todo.all()
            ctx.body = { code: 200, data: todos }
        } catch (e) {
            ctx.body = { code: 0, data: e }
        }
    },
    insert: async function (ctx, next) {
        let todo = ctx.request.body.todo
        let create_at = ctx.request.body.create_at
        let completed = ctx.request.body.completed

        if (!todo) {
            ctx.body = { code: 0, data: 'params empty!' };
            return
        }

        try {
            const insertId = await Todo.insert({ todo, create_at, completed })
            ctx.body = { code: 200, data: insertId }
        } catch (e) {
            console.error(e);
            ctx.body = { code: 0, data: e }
        }
    },
    update: async function (ctx, next) {
        let completed = ctx.request.body.completed
        let id = ctx.params.id

        try {
            const updateId = await Todo.update(id, { completed })
            ctx.body = { code: 200, data: updateId }
        } catch (e) {
            console.error(e);
            ctx.body = { code: 0, data: e }
        }
    },
    delete: async function (ctx, next) {
        let id = ctx.params.id

        try {
            const todo = await Todo.delete(id)
            ctx.body = { code: 200, data: todo }
        } catch (e) {
            console.error(e);
            ctx.body = { code: 0, data: e }
        }
    },

}

module.exports = todosController