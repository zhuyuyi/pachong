// 切割字符串方法
function getUrlParams(params) {
    let finalParams = '?';
    for (let param in params) {
        finalParams += param + '=' + params[param] + '&';
    }
    finalParams = finalParams.replace(/&$/g, '')
    return finalParams;
}

module.exports = {
    getUrlParams
}