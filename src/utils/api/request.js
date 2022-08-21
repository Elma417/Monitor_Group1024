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
        let body = res.body
        for(let key of body) {
            key.detail = JSON.parse(body.detail)
        }
        //页面访问
        let uuid = body[0].uuid, pv = 0, userNum = 0;
        const pageAccess = body.filter((el) => {
            if(el.type === 'pv') {
                pv++
                if(el.uuid !== uuid) {
                    userNum++
                    uuid = el.uuid
                }
                return el;
            }
        })

        //页面性能

        //资源异常
        // let pv = 0, uuid = body[0].uuid, userNum = 0,
        //     excNum = 0;
        // const resourceExc = body.filter((el) => {
        //     if(el.detail.errorType === 'resourceError' && el.type === 'error') {
        //         pv++
        //         excNum++
        //         if(el.uuid !== uuid) {
        //             userNum++
        //             uuid = el.uuid
        //         }
        //         return el;
        //     }
        // })

        //白屏异常
        // let wsNum = 0, uuid = body[0].uuid, userNum = 0,
        // const wsExc = body.filter((el) => {
        //     if(el.type === 'whiteScreen') {
        //         wsNum++
        //         if(el.uuid !== uuid) {
        //             userNum++
        //             uuid = el.uuid
        //         }
        //         return el
        //     }
        // })
    }
)

// 实时大盘数据过滤
export function filterRealTime(response, time = "2022-8-19") {
    let jsNum = 0,
        apiSuccess = 0, apiCount = 0,
        pagePfmTime = 0, pagePfmCount = 0,
        whiteScreenNum = 0, resourceExcNum = 0, pageAccessNum = 0;

    for (let el of response) {
        if (el.detail.errorType === 'jsError' && el.time.indexOf(time)) {
            jsNum++
        } else if (el.type === 'xhr' || el.type === 'fetch' && el.time.indexOf(time)) {
            if(el.detail.status === '200') {
                apiSuccess++
                apiCount++
            } else {
                apiCount++
            }
        } else if (el.type === 'paint' && el.time.indexOf(time)) {
            pagePfmTime += el.detail.fp
            pagePfmCount++
        } else if (el.type === 'whiteScreen' && el.time.indexOf(time)) {
            whiteScreenNum++
        } else if (el.detail.errorType === 'resourceError' && el.time.indexOf(time)) {
            resourceExcNum++
        } else if (el.type === 'pv' && el.time.indexOf(time)) {
            pageAccessNum++
        }
    }

    return {
        jsNum: jsNum,
        apiRate: Math.floor(apiSuccess / apiCount),
        pagePfmTime: Math.floor(pagePfmTime / pagePfmCount),
        whiteScreenNum: whiteScreenNum,
        resourceExcNum: resourceExcNum,
        pageAccessNum: pageAccessNum
    }
}

//

// js异常图表数据过滤
export function filterJsChart(response) {
    let jsExcList = [], timeList = [], pvList = [];

    for (let key of response) {
        jsExcList.push(key.pv)
        timeList.push(key.time)
        pvList.push(key.pv)
    }

    return {
        jsExcNum: jsExcList,
        pv: pvList,
        time: timeList
    }
}

// js异常数据过滤
export function filterJsExc(response, time = '2022-8-19') {
    let JSexcNum = 0, num = 0;
    const jsExc = response.filter((el) => {
        if(el.type === 'error' && el.detail.errorType === 'jsError') {
            JSexcNum++
            if(el.time.indexOf(time)) { //统计当天的js异常
                num++
            } else {
                el.num = num
                num = 0
            }
        }
    })

    return {
        JSexcNum: JSexcNum,
        otherData: jsExc
    }
}

export function filterPagePfmChart(response) {
    let timeList = [], fpList = [], fcpList = [], domList = [];

    response.filter((el) => {
        if(el.type === 'paint') {
            timeList.push(el.time)
            fpList.push(el.detail.fp)
            fcpList.push(el.detail.fcp)
        } else if(el.type === 'timing') {
            domList.push(el.detail.DOMReady)
        }
    })

    return {
        time: timeList,
        fp: fpList,
        fcpList: fcpList,
        DOM_ready: domList
    }
}

export function filterPagePfmExc(response) {
    let PfCon = 0, PfCount = 0,
        PfContentCon = 0, PfContentCount = 0,
        PfDoneCon = 0, PfDoneCount = 0;
    const pagePfm = response.filter((el) => {
        if(el.type === 'paint') {

            PfCon += el.detail.fp
            PfCount++

            PfContentCon += el.detail.fcp
            PfContentCount++

            PfDoneCon += el.detail.lcp
            PfDoneCount++

            return el;
        }
    })

    const DOMReady = [];
    response.filter((el) => {
        if(el.type === 'timing') {
            DOMReady.push(el.detail.DOMReady)
        }
    })

    if(DOMReady.length <= pagePfm.length) {
        pagePfm.map((el, idx) => {
            el.DOMReady = DOMReady[idx]
        })
    }

    const PFMTotal = {
        PfCon: Math.floor(PfCon/PfCount),
        PfContentCon: Math.floor(PfContentCon/PfContentCon),
        PfDoneCon: Math.floor(PfDoneCon/PfDoneCount)
    }

    return { pagePfm, PFMTotal }
}

// 资源异常图表数据过滤
// export function filterResourceChart(response) {
//     let initTime = response[0].time,
//         pvCount = 0, uvCount = 0, uuid = '',
//         timeList = [], resourceList = [], pvList = [], uvList = [];
//     for(let key of response) {
//         if(key.time === initTime) {
//             uuid = key.uuid
//             uvCount++
//             pvCount += key.pv
//         }
//     }
//
// }
