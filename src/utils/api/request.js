import axios from 'axios'

export const apiUrl = {
    // 图表数据接口
    getChart: '/getChartData',
    // 其余数据接口
    getAll: '/getAllData',
}

export const request = function (url,params = {}) {
    const host = 'http://159.75.110.252:7001/api'
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

// 客户端,操作系统，城市占比统计
export function statistics(dataList, type) {
    let sumCount = 0, list = [], count = 0,
        init = dataList[0][`${type}`];

    for(let key of dataList) {
        if(!key[`${type}`] || key[`${type}`] === null) break

        sumCount++
        if(key[`${type}`] === init) {
            count++
        } else {
            const data = {
                rate: count,
                name: key[`${type}`]
            }

            list.push(data)
            count = 0
        }
    }

    if(count === dataList.length) {
        const data = {
            rate: count,
            name: init
        }

        list.push(data)
    }

    for (let key of list) {
        key.rate = key.rate/sumCount
    }

    return list
}

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

// 页面访问图表数据过滤
export function filterPageAccessChart(response) {
    let timeList = [], pvList = [], uvList = [];
    for (let key of response) {
        timeList.push(key.time)
        pvList.push(key.pv)
        uvList.push(key.uv)
    }

    return {
        time: timeList,
        pv: pvList,
        uv: uvList
    }
}


// 页面访问数据过滤
export function filterPageAccessData(response) {
    let url = 'http://182.61.146.211:5173/',
        initUuid = response[0].uuid, uvCount = 0;

    const pageAccess = response.filter((el) => {
        if(el.type === 'pv') {
            if(initUuid !== el.uuid) {
                uvCount++
                initUuid = el.uuid
            }
            return el
        }
    })

    const accessContent = {
        pv: pageAccess.length,
        uv: uvCount,
        url: url
    }

    return { accessContent, pageAccess }
}

// API图表数据过滤
export function filterApiChart(response) {
    let initTime = response[0].time,
        reqNum = 0, successCount = 0,
        timeList = [], reqNumList = [], successRateList = [];

    for(let key of response) {
        if(key.time === initTime) {
            reqNum++
            if(key.detail.status === '200') {
                successCount++
            }
        } else {
            timeList.push(initTime)
            reqNumList.push(reqNum)
            successRateList.push(Math.floor(successCount/reqNum))

            initTime = key.time
            reqNum = 0
            successCount = 0
        }
    }

    return {
        time: timeList,
        reqNum: reqNumList,
        successRate: successRateList
    }
}

// API其余数据过滤
export function filterApiExc(response) {
    let url = 'http://182.61.146.211:5173/';
    let consumeCount = 0, APIreqNum = 0, ReqCon = 0, successCount = 0;

    const apiExc = response.filter((el) => {
        if(el.type === 'xhr' || el.type === 'fetch') {
            APIreqNum++
            consumeCount += el.detail.duration
            if(el.detail.status == 200) {
                successCount++
            }
            el.url = url
            delete el.uuid
            return el
        }
    })

    const apiTotal = {
        APIreqNum: APIreqNum,
        successRate: successCount/APIreqNum,
        ReqCon: Math.floor(consumeCount/APIreqNum)
    }

    return { apiTotal, apiExc }
}

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
export function filterJsExc(response, time = '2022-8-20') {
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
            return el
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


export function ResourceChart(response) {
    let ResourceExcList = [],
      pvlist = [],
      uvlist = [],
      timelist = [];
  
    let set = new Set();
    response
      .filter((obj) => obj.type === "error")
      .forEach((obj) => {
        let detail = JSON.parse(obj.detail);
        if (detail.errorType === "resourceError") {
          ResourceExcList.push(detail);
          pvlist.push(1);
          if (!set.has(obj.uuid)) {
            set.add(obj.uuid);
            uvlist.push(1);
          } else {
            uvlist.push(0);
          }
          timelist.push(obj.time);
        }
      });
  
    return({
      ResourceExc: ResourceExcList,
      pv: pvlist,
      uv: uvlist,
      time: timelist,
    });
  }
  
  //
  export function ResourceResult(response) {
    let resourceError = [],
      pvCur = 0;
    response
      .filter((obj) => obj.type === "error")
      .forEach((obj) => {
        let detail = JSON.parse(obj.detail);
        if (detail.errorType === "resourceError") {
          pvCur++;
          let _obj = {
            pv: pvCur,
            time: obj.time,
            uuid: obj.uuid,
            detail: obj.detail,
          };
          resourceError.push(_obj);
        }
        
      });
    return { resourceError };
  }
  
  //WhiteScreen
  export function WhiteScreenData(response) {
    
    let result = {
      whiteNum: 0,
      detail: [],
      time: "",
    };
    return result
    // console.log(result);
  }
  