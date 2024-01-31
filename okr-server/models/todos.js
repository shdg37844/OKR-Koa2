const knex = require('./knex');
const Base = require('./base.js');

class Todo extends Base {
    constructor(props = 'todos') {
        super(props);
    }

    selectTodos(krids) {
        return knex(this.table)
            .join('todo_keyresults', 'todos.id', '=', 'todo_keyresults.todo_id')
            .whereIn('todo_keyresults.kr_id', krids)
            .select('todos.*', 'todo_keyresults.kr_id') 
    }
}
 
module.exports = Todo