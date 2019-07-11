const https = require('https');
const {
    myFind
} = require('./../database/index');
const {
    getUrlParams
} = require('./../utils/utils');

// promise通用
function promiseApi() {
    return new Promise((resolve, reject) => {
        // 最终的字符串传参
        let finalParams = getUrlParams(params);
        // 拼接参数
        options.path = `/cgi/api/query${finalParams}`;
        // 发起 http 请求
        const req = https.request(options, (res) => {
            // json数据缓存
            let json = ''
            // 获取响应体数据
            res.on('data', (data) => {
                // data 是 Buffer流
                json += data;
            });
            // 请求结束，对数据处理
            res.on('end', () => {
                // 转为js可以处理的正常数据
                let data = JSON.parse(json);
                resolve(data.result);
            })
        })
        // 错误处理
        req.on('error', (err) => {
            reject(err)
        })
        // 结束标志
        req.end();
    })
}

// 定时函数
async function timeout(timer) {
    return new Promise((resolve, reject) => {
        setTimeout(async () => {
            let data = await promiseApi();

            console.log('=================分割线===============');
            for (let item of data) {
                await myFind(item.game_ordersn, item);
            }
            console.log('=================分割线===============');

            if (data && data.length !== 0) {
                // 数据没有到头 则继续
                // 每次页码都加1
                params.page++;
                // 递归调用
                await timeout(timer)
            } else {
                // 重新开始新的循环，为了保证数据永远最新
                params.page = 1;
                // 递归调用
                await timeout(timer)
            }
            resolve(data);
        }, timer)
    })
}

// 接口参数
const params = {
    equip_level_min: 69,
    equip_level_max: 69,
    order_by: 'collect_num%20DESC',
    total_score: 29000,
    price_max: 999900,
    school: '7,3',
    page: 1
}

// headers
const options = {
    // 梦幻西游手游cbg列表数据
    hostname: 'my.cbg.163.com',
    method: 'GET',
}

module.exports = {
    timeout,
    promiseApi
}