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
    // showSomeItem: async function (ctx, next) {
    //     let id = ctx.params.id

    //     try {
    //         let objective = await Objective.select(id)
    //         ctx.body = { code: 200, data: objective }
    //     } catch (e) {
    //         ctx.body = { code: 0, data: e }
    //     }
    // },


}

module.exports = objectivesController