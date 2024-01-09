const Base = require('./base.js');

class Todo extends Base {
    constructor(props = 'todos') {
        super(props);
    }
}

module.exports = Todo