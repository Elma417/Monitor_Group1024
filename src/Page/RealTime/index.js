import JSexcChar from "../../Component/RealTimeChar/JSexcChar";
import APISuccessRateChar from "../../Component/RealTimeChar/APISuccessRateChar";
import PagePfmChar from "../../Component/RealTimeChar/PagePfmChar";
import ResourceExcChar from "../../Component/RealTimeChar/ResourceExcChar";
import WhiteScreenChar from "../../Component/RealTimeChar/WhiteScreenChar";
import PageAccessChar from "../../Component/RealTimeChar/PageAccessChar";
import React, { useState, useEffect } from "react";
import axios from "axios";

//实时大盘
function RealTime() {
  const [jsNum, setJsNum] = useState(0);
  const [apiRate, setApiRate] = useState(0);
  const [pagePfmTime, setPagePfmTime] = useState(0);
  const [whiteScreenNum, setWhiteScreenNum] = useState(0);
  const [resourceExcNum, setResourceExcNum] = useState(0);
  const [pageAccessNum, setPageAccessNum] = useState(0);
  let date = new Date();

  useEffect(() => {
    //request
    const fetchStatistics = async () => {
      const res = await axios.get("http://localhost:3100/statistics", {
        params: {
          time: `${date.getFullYear()}-${
            date.getMonth() + 1
          }-${date.getDate()}`,
        },
      });
      console.log(
        `log:${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
      );
      setJsNum(res.data.jsNum);
      setApiRate(res.data.apiRate);
      setPagePfmTime(res.data.pagePfmTime);
      setWhiteScreenNum(res.data.whiteScreenNum);
      setResourceExcNum(res.data.resourceExcNum);
      setPageAccessNum(res.data.pageAccessNum);
      //终端打印查看
      console.log("data:" + JSON.stringify(res.data));
      // {
      //   jsNum:1244,           //今日JS异常总数
      //   apiRate:0.96,         //今日API平均成功率
      //   pagePfmTime:2456,     //今日平均首屏绘制时间（PF）
      //   whiteScreenNum:12     //今日白屏异常总数
      //   resourceExcNum:14531, //今日资源异常总数
      //   pageAccessNum:1238,   //今日页面访问数（pv）
      // }
    };
    const timer = window.setInterval(() => {
      fetchStatistics();
    }, 10000);

    //delete timer
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div
      className="h-full w-full flex flex-col justify-start items-center
     bg-gray-200"
    >
      {/* 第一行图表 */}
      <div
        className="h-45/100 w-full bg-gray-200 flex justify-between items-center
        py-3 px-4 gap-4"
      >
        {/* JS异常 */}
        <div
          className="h-full w-1/3 bg-gray-50 rounded flex flex-col 
        justify-start items-start p-2"
        >
          <div className="h-8 w-full flex items-center px-3 text-gray-600 bg-green-30">
            JS异常
          </div>
          <div
            className="h-8 w-full flex items-center px-3 text-gray-600
          text-3xl bg-green-30"
          >
            {jsNum}
          </div>
          {/* 数据可视化图表 */}
          <div className="h-full w-full ">
            <JSexcChar></JSexcChar>
          </div>
        </div>

        {/* API成功率 */}
        <div
          className="h-full w-1/3 bg-gray-50 rounded flex flex-col 
        justify-start items-start p-2"
        >
          <div className="h-8 w-full flex items-center px-3 text-gray-600 bg-green-30">
            API成功率
          </div>
          <div
            className="h-8 w-full flex items-center px-3 text-gray-600
          text-3xl bg-green-30"
          >
            {apiRate} %
          </div>
          {/* 数据可视化图表 */}
          <div className="h-full w-full">
            <APISuccessRateChar></APISuccessRateChar>
          </div>
        </div>

        {/* 页面性能 */}
        <div
          className="h-full w-1/3 bg-gray-50 rounded flex flex-col 
        justify-start items-start p-2"
        >
          <div className="h-8 w-full flex items-center px-3 text-gray-600 bg-green-30">
            页面性能
          </div>
          <div
            className="h-8 w-full flex items-center px-3 text-gray-600
          text-3xl bg-green-30"
          >
            {pagePfmTime} ms
          </div>
          {/* 数据可视化图表 */}
          <div className="h-full w-full">
            <PagePfmChar></PagePfmChar>
          </div>
        </div>
      </div>

      {/* 第二行图表 */}
      <div
        className="h-45/100 w-full bg-gray-200  flex justify-between items-center
       py-3 px-4 gap-4"
      >
        {/* 白屏异常 */}
        <div
          className="h-full w-1/3 bg-gray-50 rounded flex flex-col 
        justify-start items-start p-2"
        >
          <div className="h-8 w-full flex items-center px-3 text-gray-600 bg-green-30">
            白屏异常
          </div>
          <div
            className="h-8 w-full flex items-center px-3 text-gray-600
          text-3xl bg-green-30"
          >
            {whiteScreenNum}
          </div>
          {/* 数据可视化图表 */}
          <div className="h-full w-full">
            <WhiteScreenChar></WhiteScreenChar>
          </div>
        </div>

        {/* 资源异常 */}
        <div
          className="h-full w-1/3 bg-gray-50 rounded flex flex-col 
        justify-start items-start p-2"
        >
          <div className="h-8 w-full flex items-center px-3 text-gray-600 bg-green-30">
            资源异常
          </div>
          <div
            className="h-8 w-full flex items-center px-3 text-gray-600
          text-3xl bg-green-30"
          >
            {resourceExcNum}
          </div>
          {/* 数据可视化图表 */}
          <div className="h-full w-full">
            <ResourceExcChar></ResourceExcChar>
          </div>
        </div>

        {/* 页面访问 */}
        <div
          className="h-full w-1/3 bg-gray-50 rounded flex flex-col 
        justify-start items-start p-2"
        >
          <div className="h-8 w-full flex items-center px-3 text-gray-600 bg-green-30">
            页面访问
          </div>
          <div
            className="h-8 w-full flex items-center px-3 text-gray-600
           bg-green-30"
          >
            访问数 ： {pageAccessNum}
          </div>
          {/* 数据可视化图表 */}
          <div className="h-full w-full">
            <PageAccessChar></PageAccessChar>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RealTime;
