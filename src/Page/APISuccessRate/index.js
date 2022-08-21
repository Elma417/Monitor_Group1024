import React, { useState, useEffect } from "react";
import APISuccessTrend from "../../Component/APIsuccessCPN/APISuccessTrend";
import Details from "../../Component/APIsuccessCPN/Details";
import RingChar from "../../Component/RingChar";
import MapChar from "../../Component/MapChar";
import { request, apiUrl } from "../../utils/api/request";

function APISuccessRate(props) {
  const [today, setToday] = useState("");
  const [APIreqNum, setAPIreqNum] = useState(0); //所有url请求总次数
  const [successRate, setSuccessRate] = useState(0); // 平均成功率
  const [reqCon, setReqCon] = useState(0); // 平均请求耗时

  useEffect(() => {
    request(apiUrl.getAll).then(
        (res) => {
          let body = res.body;
          for (let key of body) {
            key.detail = JSON.parse(key.detail)
          }
        }
    )
    setToday(props.today);
  }, [props.today]);

  return (
    <div className="h-full w-full flex flex-col justify-start items-center bg-gray-200">
      {/* 滚动窗口框（含滚动条） */}
      <div
        className="flex-grow w-full flex flex-col justify-start items-center
      gap-1 overflow-y-scroll"
      >
        {/* 可变长内容 */}
        <div className="h-auto w-full py-3 flex flex-col justify-start items-center bg-gray-20 gap-3">
          {/* 今日异常数据总览 */}
          <div
            className="h-24 w-11/12 border flex justify-around items-center
           bg-gray-50 rounded divide-x-2 divide-gray-200 p-2 "
          >
            <div
              className="h-full flex justify-center items-center tracking-wide text-gray-400"
              style={{ writingMode: "vertical-lr", width: "50px" }}
            >
              今日数据
            </div>
            <div className="h-full w-60 flex-grow flex flex-col justify-between items-center p-1">
              <p className="text-gray-500">请求次数</p>
              <p className="text-gray-600 text-3xl font-bold">{APIreqNum}</p>
            </div>
            <div className="h-full w-60 flex-grow flex flex-col justify-between items-center p-1">
              <p className="text-gray-500">成功率</p>
              <p className="text-gray-600 text-3xl font-bold">{successRate}%</p>
            </div>
            <div className="h-full w-60 flex-grow flex flex-col justify-between items-center p-1">
              <p className="text-gray-500">请求耗时</p>
              <p className="text-gray-600 text-3xl font-bold">{reqCon} ms</p>
            </div>
          </div>
          {/* 数据可视化大图表 */}
          <div className="h-450 w-11/12 border bg-gray-50 rounded p-2 shrink-0">
            <APISuccessTrend today={today}></APISuccessTrend>
          </div>
          {/* 详情区 */}
          <div className="h-fit max-h-500 w-11/12 rounded shrink-0 mt-3">
            <Details today={today}></Details>
          </div>
          {/* 环形图表区 */}
          <div
            className="h-500 w-11/12 rounded p-2 bg-gray-50 shrink-0 mt-4 flex justify-between items-center
          divide-x-2 divide-gray-200"
          >
            <div className="h-full w-1/2 flex flex-col justify-center items-center p-2">
              <div className="h-12 w-5/6 text-xl text-blue-600 font-bold">
                客户端
              </div>
              <RingChar></RingChar>
            </div>
            <div className="h-full w-1/2 flex flex-col justify-center items-center p-2">
              <div className="h-12 w-5/6 text-xl text-blue-600 font-bold">
                操作系统
              </div>
              <RingChar></RingChar>
            </div>
          </div>
          {/* 地域热力图 */}
          <div className="h-600 w-11/12 rounded p-2 bg-gray-50 shrink-0 mt-4 flex flex-col justify-between items-center">
            <div className="h-12 w-5/6 pt-2 text-xl text-blue-600 font-bold">
              异常地域分布
            </div>
            <div className="flex-grow h-500 w-full min-h-0 ">
              <MapChar></MapChar>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default APISuccessRate;
