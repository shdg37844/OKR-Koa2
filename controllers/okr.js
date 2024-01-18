const keyresultModel = require('./../models/keyresults')
const objectiveModel = require('./../models/objectives')
const Keyresult = new keyresultModel()
const Objective = new objectiveModel()

const okrController = {
    insert: async function (ctx, next) {
        let Ocontent = ctx.request.body.Ocontent
        let KRcontent = ctx.request.body.KRcontent
        let create_at = ctx.request.body.create_at
        let KRcompleted = ctx.request.body.KRcompleted
        let Ocompleted = ctx.request.body.Ocompleted

        if (!Ocontent || !KRcontent || KRcontent.length === 0) {
            ctx.body = { code: 0, data: 'params empty!' };
            return
        }

        try {
            const insertId = await Objective.insert({ Ocontent, create_at, Ocompleted })
            let KRinsertIds = []

            for (KR of KRcontent) {
                const KRinsertId = await Keyresult.insert({ objective_id: insertId, KRcontent: KR, KRcompleted: KRcompleted })
                KRinsertIds.push(KRinsertId)
            }
            ctx.body = { code: 200, data: { objectiveId: insertId, keyResultIds: KRinsertIds } }

        } catch (e) {
            console.error(e);
            ctx.body = { code: 0, data: e }
        }

    },
    showSomeItem: async function (ctx, next) {
        let id = ctx.params.id;

        try {
            let objective = await Objective.select({id})
            let keyresults = await Keyresult.select({objective_id:id})
            ctx.body = { code: 200, data: {objective, keyresults} }

        } catch (e) {
            ctx.body = { code: 0, data: e }
        }
        
    },
}

module.exports = okrController