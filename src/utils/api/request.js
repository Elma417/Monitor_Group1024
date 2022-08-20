import axios from 'axios'

export const apiUrl = {
    // 图表数据接口
    getChart: '/getChartData',
    // 其余数据接口
    getAll: '/getAllData',
}

export const request = function (url,params = {}) {
    const host = 'http://182.61.146.211:7001/api'
    return new Promise((resolve,reject) => {
        axios({
            url: host + url,
            method: 'get',
        })
            .then(res => {
                resolve(res.data)         //返回请求数据
            })
            .catch(err => {
                reject(err.data)          //返回错误
            })
    })
}


request(apiUrl.getAll).then(
    (res) => {
        let body = res.body;
        for (let key of body) {
            key.detail = JSON.parse(key.detail)
        }
        console.log(body);
    }
)


