const Cbg = require('./../models/list');

// 保存数据库
function mySave(item) {
    return new Promise(async (resolve, reject) => {
        await new Cbg(item)
            .save()
            .then((data) => {
                console.log(`存入数据库成功 ${item.game_ordersn}`)
                resolve(data)
            })
            .catch((err) => {
                reject(err);
            })
    })
}

// 更新数据库
function myUpdate(item) {
    return new Promise(async (resolve, reject) => {
        await Cbg.updateOne({
                game_ordersn: item.game_ordersn
            }, item)
            .then((data) => {
                console.log(`更新数据库成功 ${item.game_ordersn}`)
                resolve(data)
            })
            .catch((err) => {
                reject(err);
            })
    })
}

// 查找数据库
function myFind(id, item) {
    return new Promise(async (resolve, reject) => {
        let params = {
            game_ordersn: id
        }
        await Cbg.findOne(params)
            .then(async (doc) => {
                if (doc) {
                    await myUpdate(item)
                } else {
                    await mySave(item)
                }
            })
            .catch((err) => {
                reject(err);
            });
        resolve('查询')
    })
}

module.exports = {
    myFind
}