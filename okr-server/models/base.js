const knex = require('./knex');

class Base {
    constructor(props) {
        this.table = props;
    }

    all() {
        return knex(this.table).select()
    }

    select(params) {
        return knex(this.table).select().where(params)
    }

    selectArray(column, array) {
        return knex(this.table).select().whereIn(column, array);
    }

    

    

    insert(params) {
        return knex(this.table).insert(params)
    }

    update(id, params) {
        return knex(this.table).where('id', '=', id).update(params)
    }

    delete(id) {
        return knex(this.table).where('id', '=', id).del()
    }

    deleteColumn(column, value) {
        return knex(this.table).where(column, '=', value).del();
    }


}

module.exports = Base;