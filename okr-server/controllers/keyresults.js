const keyresultModel = require('../models/keyresults')
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
    update: async function (ctx, next) {
        let KRcompleted = ctx.request.body.KRcompleted
        let id = ctx.params.id

        try {
            const updateId = await Keyresult.update(id, { KRcompleted })
            ctx.body = { code: 200, data: updateId }
        } catch (e) {
            console.error(e);
            ctx.body = { code: 0, data: e }
        }
    },
    insert: async function (ctx, next) {
        let KRcontent = ctx.request.body.KRcontent
        let KRcompleted = ctx.request.body.KRcompleted

        if (!KRcontent) {
            ctx.body = { code: 0, data: 'params empty!' };
            return
        }

        try {
            const insertId = await Keyresult.insert({ KRcontent, KRcompleted })
            ctx.body = { code: 200, data: insertId }
        } catch (e) {
            console.error(e);
            ctx.body = { code: 0, data: e }
        }
    },
    delete: async function (ctx, next) {
        let id = ctx.params.id

        try {
            const keyresult = await Keyresult.delete(id)
            ctx.body = { code: 200, data: keyresult }
        } catch (e) {
            console.error(e);
            ctx.body = { code: 0, data: e }
        }
    },

}

module.exports = keyresultsController