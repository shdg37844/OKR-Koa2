const keyresultModel = require('./../models/keyresults')
const Keyresult = new keyresultModel()

const keyresultsController = {
    show: async function (ctx, next) {
        try {
            let keyresults = await Keyresult.all()
            ctx.body = { code: 200, data: keyresults }
        } catch (e) {
            ctx.body = { code: 0, data: e }
        }
    },
    // showSomeItem: async function (ctx, next) {
    //     let id = ctx.params.id

    //     try {
    //         let keyresult = await Keyresult.select(id)
    //         ctx.body = { code: 200, data: keyresult }
    //     } catch (e) {
    //         ctx.body = { code: 0, data: e }
    //     }
    // },
}

module.exports = keyresultsController