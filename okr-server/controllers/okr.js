const keyresultModel = require('../models/keyresults')
const objectiveModel = require('../models/objectives')
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

            // let KRinsertIds = []
            // for (KR of KRcontent) {
            //     const KRinsertId = await Keyresult.insert({ objective_id: insertId, KRcontent: KR, KRcompleted: KRcompleted })
            //     KRinsertIds.push(KRinsertId)
            // }


            const KRinsertData =KRcontent.map(KR => {
                return {
                    KRcontent: KR,
                    objective_id: insertId,
                    KRcompleted: KRcompleted
                }
            })
            //console.log('KRcontenttttttt', KRinsertData)
            const KRinsertIds = await Keyresult.insert(KRinsertData)

            ctx.body = { code: 200, data: { objectiveId: insertId, keyResultIds: KRinsertIds } }

        } catch (e) {
            console.error(e);
            ctx.body = { code: 0, data: e }
        }

    },
    showSomeItem: async function (ctx, next) {
        let id = ctx.params.id;

        try {
            let objective = await Objective.select({ id })
            let keyresults = await Keyresult.select({ objective_id: id })
            ctx.body = { code: 200, data: { objective, keyresults } }

        } catch (e) {
            ctx.body = { code: 0, data: e }
        }

    },
    update: async function (ctx, next) {
        let id = ctx.params.id
        let Ocontent = ctx.request.body.Ocontent
        let KRcontent = ctx.request.body.KRcontent
        let Ocompleted = ctx.request.body.Ocompleted
        let KRcompleted = ctx.request.body.KRcompleted

        try {
            const updateObjectiveId = await Objective.update(id, { Ocontent: Ocontent, Ocompleted: Ocompleted })
            let updateKRIds = [];
            let newKRIds = [];

            for (KR of KRcontent) {
                if (KR.id) {
                    const updateKRId = await Keyresult.update(KR.id, { KRcontent: KR.KRcontent })
                    updateKRIds.push(updateKRId);
                } else {
                    const newKRId = await Keyresult.insert({ KRcontent: KR.KRcontent, objective_id: id, KRcompleted: KRcompleted });
                    newKRIds.push(newKRId);
                }
            }
            ctx.body = { code: 200, data: { updateObjectiveId, newKRIds, updateKRIds } }
        } catch (e) {
            console.error(e);
            ctx.body = { code: 0, data: e }
        }
    },
    delete: async function (ctx, next) {
        let id = ctx.params.id

        try {
            const objective = await Objective.delete(id)
            const keyresult = await Keyresult.deleteColumn({ objective_id: id })
            ctx.body = { code: 200, data: { objective, keyresult } }
            //console.log('删去的obj：', objective, "删去的kr：", keyresult)

        } catch (e) {
            console.error(e);
            ctx.body = { code: 0, data: e }
        }
    },
}

module.exports = okrController