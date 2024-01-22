const objectiveModel = require('./../models/objectives')
const Objective = new objectiveModel()

const objectivesController = {
    show: async function (ctx, next) {
        try {
            let objectives = await Objective.all()
            ctx.body = { code: 200, data: objectives }
        } catch (e) {
            ctx.body = { code: 0, data: e }
        }
    },



}

module.exports = objectivesController