import React, { useState, useEffect } from "react";
import PagePfmTrend from "../../Component/PagePfmCPN/PagePfmTrend";
import Details from "../../Component/PagePfmCPN/Details";
import RingChar from "../../Component/RingChar";
import MapChar from "../../Component/MapChar";
import {request, apiUrl, filterPagePfmChart, filterPagePfmExc} from "../../utils/api/request";

function PagePfm(props) {
  const [today, setToday] = useState("");
  const [pfCon, setPfCon] = useState(0); //首屏绘制时间
  const [pfContentCon, setPfContentCon] = useState(0); // 首屏内容绘制时间
  const [pfDoneCon, setPfDoneCon] = useState(0); // 页面解析完成的时间

  let pagePfmChart = {}, pagePfmExc = [], pfmTotal = {};

  useEffect(() => {
    // 请求页面性能数据
    request(apiUrl.getChart,{
      queryType: props.queryType, // 参数格式string，值参考文档
      startTime: props.startTime, // 参数格式string "2022-08-13 12:20:22"
      endTime: props.endTime, // 参数格式string "2022-08-19 12:20:22"
      dim: props.dim // 参数格式string 值参考文档
    }).then(
        (res) => {
          let body = res.body
          for (let key of body) {
            key.detail = JSON.parse(key.detail)
          }
          pagePfmChart = filterPagePfmChart(body)
        }
    )

    // 请求页面性能其余数据
    request(apiUrl.getAll).then(
        (res) => {
          let body = res.body
          for (let key of body) {
            key.detail = JSON.parse(key.detail)
          }
          const { pagePfm, PFMTotal } = filterPagePfmExc(body)
          pagePfmExc = pagePfm
          pfmTotal = PFMTotal
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
              <p className="text-gray-500">首屏绘制时间</p>
              <p className="text-gray-600 text-3xl font-bold">{pfCon} ms</p>
            </div>
            <div className="h-full w-60 flex-grow flex flex-col justify-between items-center p-1">
              <p className="text-gray-500">首屏内容绘制时间</p>
              <p className="text-gray-600 text-3xl font-bold">
                {pfContentCon} ms
              </p>
            </div>
            <div className="h-full w-60 flex-grow flex flex-col justify-between items-center p-1">
              <p className="text-gray-500">页面解析完成的时间</p>
              <p className="text-gray-600 text-3xl font-bold">{pfDoneCon} ms</p>
            </div>
          </div>
          {/* 数据可视化大图表 */}
          <div className="h-450 w-11/12 border bg-gray-50 rounded p-2 shrink-0">
            <PagePfmTrend today={today}></PagePfmTrend>
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

export default PagePfm;
