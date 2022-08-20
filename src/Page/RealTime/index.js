// import JSexcChar from "../../Component/RealTimeChar/JSexcChar";
// import APISuccessRateChar from "../../Component/RealTimeChar/APISuccessRateChar";
// import PagePfmChar from "../../Component/RealTimeChar/PagePfmChar";
// import ResourceExcChar from "../../Component/RealTimeChar/ResourceExcChar";
// import WhiteScreenChar from "../../Component/RealTimeChar/WhiteScreenChar";
// import PageAccessChar from "../../Component/RealTimeChar/PageAccessChar";
import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactEcharts from "echarts-for-react";

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
        className="h-1/2 w-full shrink-0 bg-gray-200 flex justify-between items-center
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
          <div className="h-full w-full bg-blue-20">
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
        className="h-1/2 w-full shrink-0 bg-gray-200  flex justify-between items-center
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

// 各种异常的趋势图
// props : data
function JSexcChar(props) {
  const colors = ["#5470C6", "#91CC75", "#EE6666"];
  const option = {
    color: colors,
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
      },
    },
    grid: {
      right: "10%",
      left: "10%",
    },
    toolbox: {
      feature: {
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true },
      },
    },
    legend: {
      data: ["JSexcNum", "pv"],
    },
    xAxis: [
      {
        type: "category",
        axisTick: {
          alignWithLabel: true,
        },
        // prettier-ignore
        data:["11:00","11:02","11:04","11:06","11:08","11:10"], //props.data.time, //x轴数据列表
      },
    ],
    yAxis: [
      {
        type: "value",
        name: "JSexcNum",
        position: "left",
        alignTicks: true,
        axisLine: {
          show: true,
          lineStyle: {
            color: colors[0],
          },
        },
        axisLabel: {
          formatter: "{value}",
        },
      },
      {
        type: "value",
        name: "pv",
        position: "right",
        alignTicks: true,
        axisLine: {
          show: true,
          lineStyle: {
            color: colors[1],
          },
        },
        axisLabel: {
          formatter: "{value}",
        },
      },
    ],
    dataZoom: [
      {
        type: "inside",
        start: 0,
        end: 100,
      },
      {
        start: 0,
        end: 100,
      },
    ],
    series: [
      {
        name: "JSexcNum",
        type: "bar",
        data: [123, 145, 331, 132, 324, 231], //props.data.time, //y轴数据列表
      },
      {
        name: "pv",
        type: "line",
        yAxisIndex: 1,
        data: [121, 231, 123, 412, 231, 251], //props.data.time, //y轴数据列表
      },
    ],
  };
  return (
    <ReactEcharts
      option={option}
      style={{ height: "100%", width: "100%" }}
    ></ReactEcharts>
  );
}

function APISuccessRateChar(props) {
  const colors = ["#5470C6", "#91CC75", "#EE6666"];
  const option = {
    color: colors,
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
      },
    },
    grid: {
      right: "12%",
      left: "10%",
    },
    toolbox: {
      feature: {
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true },
      },
    },
    legend: {
      data: ["reqNum", "successRate"],
    },
    xAxis: [
      {
        type: "category",
        axisTick: {
          alignWithLabel: true,
        },
        // prettier-ignore
        data:["11:00","11:02","11:04","11:06","11:08","11:10"], //props.data.time, //x轴数据列表
      },
    ],
    yAxis: [
      {
        type: "value",
        name: "reqNum",
        position: "left",
        alignTicks: true,
        axisLine: {
          show: true,
          lineStyle: {
            color: colors[0],
          },
        },
        axisLabel: {
          formatter: "{value}",
        },
      },
      {
        type: "value",
        name: "successRate",
        position: "right",
        alignTicks: true,
        axisLine: {
          show: true,
          lineStyle: {
            color: colors[1],
          },
        },
        axisLabel: {
          formatter: "{value} %",
        },
      },
    ],
    dataZoom: [
      {
        type: "inside",
        start: 0,
        end: 100,
      },
      {
        start: 0,
        end: 100,
      },
    ],
    series: [
      {
        name: "reqNum",
        type: "bar",
        data: [123, 145, 331, 132, 324, 231], //props.data.reqNum, //y轴数据列表
      },
      {
        name: "successRate",
        type: "line",
        yAxisIndex: 1,
        data: [121, 231, 123, 412, 231, 251], //props.data.successRate, //y轴数据列表
      },
    ],
  };
  return (
    <ReactEcharts
      option={option}
      style={{ height: "100%", width: "100%" }}
    ></ReactEcharts>
  );
}

function PagePfmChar(props) {
  const colors = ["#5470C6", "#91CC75", "#EE6666"];
  const option = {
    color: colors,
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
      },
    },
    grid: {
      right: "25%",
      left: "12%",
    },
    toolbox: {
      feature: {
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true },
      },
    },
    legend: {
      data: ["fp", "fcp", "DOM_Ready"],
    },
    xAxis: [
      {
        type: "category",
        axisTick: {
          alignWithLabel: true,
        },
        // prettier-ignore
        data:["11:00","11:02","11:04","11:06","11:08","11:10"], //props.data.time, //x轴数据列表
      },
    ],
    yAxis: [
      {
        type: "value",
        name: "fp",
        position: "right",
        alignTicks: true,
        axisLine: {
          show: true,
          lineStyle: {
            color: colors[0],
          },
        },
        axisLabel: {
          formatter: "{value} ms",
        },
      },
      {
        type: "value",
        name: "fcp",
        position: "right",
        alignTicks: true,
        offset: 60,
        axisLine: {
          show: true,
          lineStyle: {
            color: colors[1],
          },
        },
        axisLabel: {
          formatter: "{value} ms",
        },
      },
      {
        type: "value",
        name: "DOM_Ready",
        position: "left",
        alignTicks: true,

        axisLine: {
          show: true,
          lineStyle: {
            color: colors[2],
          },
        },
        axisLabel: {
          formatter: "{value} ms",
        },
      },
    ],
    dataZoom: [
      {
        type: "inside",
        start: 0,
        end: 100,
      },
      {
        start: 0,
        end: 100,
      },
    ],
    series: [
      {
        name: "fp",
        type: "bar",
        data: [123, 145, 331, 132, 324, 231], //props.data.fp, //y轴数据列表
      },
      {
        name: "fcp",
        type: "bar",
        yAxisIndex: 1,
        data: [121, 231, 123, 412, 231, 251], //props.data.fcp, //y轴数据列表
      },
      {
        name: "DOM_Ready",
        type: "line",
        yAxisIndex: 2,
        data: [121, 231, 123, 412, 231, 251], //props.data.DOM_Ready, //y轴数据列表
      },
    ],
  };
  return (
    <ReactEcharts
      option={option}
      style={{ height: "100%", width: "100%" }}
    ></ReactEcharts>
  );
}

function WhiteScreenChar(props) {
  const colors = ["#EE6666", "#5470C6", "#91CC75"];
  const option = {
    color: colors,
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
      },
    },
    grid: {
      right: "5%",
      left: "12%",
    },
    toolbox: {
      feature: {
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true },
      },
    },
    legend: {
      data: ["WhiteScreenNum"],
    },
    xAxis: [
      {
        type: "category",
        axisTick: {
          alignWithLabel: true,
        },
        // prettier-ignore
        data:["11:00","11:02","11:04","11:06","11:08","11:10"], //props.data.time, //x轴数据列表
      },
    ],
    yAxis: [
      {
        type: "value",
        name: "WhiteScreenNum",
        position: "left",
        alignTicks: true,
        axisLine: {
          show: true,
          lineStyle: {
            color: colors[0],
          },
        },
        axisLabel: {
          formatter: "{value}",
        },
      },
    ],
    dataZoom: [
      {
        type: "inside",
        start: 0,
        end: 100,
      },
      {
        start: 0,
        end: 100,
      },
    ],
    series: [
      {
        name: "WhiteScreenNum",
        type: "line",
        data: [0, 1, 0, 0, 0, 0], //props.data.WhiteScreenNum, //y轴数据列表
      },
    ],
  };
  return (
    <ReactEcharts
      option={option}
      style={{ height: "100%", width: "100%" }}
    ></ReactEcharts>
  );
}

function ResourceExcChar(props) {
  const colors = ["#5470C6", "#91CC75", "#EE6666"];
  const option = {
    color: colors,
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
      },
    },
    grid: {
      right: "20%",
      left: "10%",
    },
    toolbox: {
      feature: {
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true },
      },
    },
    legend: {
      data: ["ResourceExcNum", "pv", "uv"],
    },
    xAxis: [
      {
        type: "category",
        axisTick: {
          alignWithLabel: true,
        },
        // prettier-ignore
        data:["11:00","11:02","11:04","11:06","11:08","11:10"], //props.data.time, //x轴数据列表
      },
    ],
    yAxis: [
      {
        type: "value",
        name: "ResourceExcNum",
        position: "left",
        alignTicks: true,
        axisLine: {
          show: true,
          lineStyle: {
            color: colors[0],
          },
        },
        axisLabel: {
          formatter: "{value}",
        },
      },
      {
        type: "value",
        name: "pv",
        position: "right",
        alignTicks: true,
        axisLine: {
          show: true,
          lineStyle: {
            color: colors[1],
          },
        },
        axisLabel: {
          formatter: "{value}",
        },
      },
      {
        type: "value",
        name: "uv",
        position: "right",
        alignTicks: true,
        offset: 40,
        axisLine: {
          show: true,
          lineStyle: {
            color: colors[2],
          },
        },
        axisLabel: {
          formatter: "{value}",
        },
      },
    ],
    dataZoom: [
      {
        type: "inside",
        start: 0,
        end: 100,
      },
      {
        start: 0,
        end: 100,
      },
    ],
    series: [
      {
        name: "ResourceExcNum",
        type: "bar",
        data: [123, 145, 331, 132, 324, 231], //props.data.ResourceExcNum, //y轴数据列表
      },
      {
        name: "pv",
        type: "line",
        yAxisIndex: 1,
        data: [121, 231, 123, 412, 231, 251], //props.data.pv, //y轴数据列表
      },
      {
        name: "uv",
        type: "line",
        yAxisIndex: 2,
        data: [121, 231, 123, 412, 231, 251], //props.data.uv, //y轴数据列表
      },
    ],
  };
  return (
    <ReactEcharts
      option={option}
      style={{ height: "100%", width: "100%" }}
    ></ReactEcharts>
  );
}

function PageAccessChar(props) {
  const colors = ["#5470C6", "#91CC75", "#EE6666"];
  const option = {
    color: colors,
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
      },
    },
    grid: {
      right: "10%",
      left: "10%",
    },
    toolbox: {
      feature: {
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true },
      },
    },
    legend: {
      data: ["pv", "uv"],
    },
    xAxis: [
      {
        type: "category",
        axisTick: {
          alignWithLabel: true,
        },
        // prettier-ignore
        data:["11:00","11:02","11:04","11:06","11:08","11:10"], //props.data.time, //x轴数据列表
      },
    ],
    yAxis: [
      {
        type: "value",
        name: "pv",
        position: "left",
        alignTicks: true,
        axisLine: {
          show: true,
          lineStyle: {
            color: colors[0],
          },
        },
        axisLabel: {
          formatter: "{value}",
        },
      },
      {
        type: "value",
        name: "uv",
        position: "right",
        alignTicks: true,
        axisLine: {
          show: true,
          lineStyle: {
            color: colors[1],
          },
        },
        axisLabel: {
          formatter: "{value}",
        },
      },
    ],
    dataZoom: [
      {
        type: "inside",
        start: 0,
        end: 100,
      },
      {
        start: 0,
        end: 100,
      },
    ],
    series: [
      {
        name: "pv",
        type: "bar",
        data: [123, 145, 331, 132, 324, 231], //props.data.time, //y轴数据列表
      },
      {
        name: "uv",
        type: "line",
        yAxisIndex: 1,
        data: [121, 231, 123, 412, 231, 251], //props.data.time, //y轴数据列表
      },
    ],
  };
  return (
    <ReactEcharts
      option={option}
      style={{ height: "100%", width: "100%" }}
    ></ReactEcharts>
  );
}
