import React, { useState, useEffect } from "react";
import ReactEcharts from "echarts-for-react";

// JS异常页面趋势图组件
// props : today(string) data(一个对象,画趋势图用)
export default function JSexcTrend(props) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [dim, setDim] = useState("min");

  useEffect(() => {
    if (startDate === "" && endDate === "") {
      setStartDate(props.today);
      setEndDate(props.today);
    }
  }, [startDate, endDate, props.today]);

  return (
    <div className="h-full w-full flex flex-col justify-between items-center">
      {/* 选项区 */}
      <div className="h-10 w-full flex justify-start items-center px-12 gap-2">
        {/* 开始时间 */}
        <div className="h-full w-60 bg-pink-20 flex justify-center items-center">
          <p className="">开始日期：</p>
          <input
            className="border px-2"
            type="date"
            value={startDate}
            onChange={(even) => {
              setStartDate(even.value);
            }}
          />
        </div>
        {/* 结束日期 */}
        <div className="h-full w-60 bg-pink-20 flex justify-center items-center ml-3">
          <p className="">结束日期：</p>
          <input
            className="border px-2"
            type="date"
            value={endDate}
            onChange={(even) => {
              setEndDate(even.value);
            }}
          />
        </div>
        {/* 细粒度 */}
        <div className="h-full w-80 flex justify-around items-center ml-5 ">
          <p>时间粒度：</p>
          {/* 分钟 */}
          <div className="h-full w-20 flex justify-center items-center gap-2 ">
            <div
              className={`h-4 w-4 rounded-full border border-gray-800 ${
                dim === "min" ? "bg-blue-500" : ""
              }`}
              onClick={() => {
                setDim("min");
              }}
            ></div>
            <p>分钟</p>
          </div>
          {/* 小时 */}
          <div className="h-full w-20 flex justify-center items-center gap-2 ">
            <div
              className={`h-4 w-4 rounded-full border border-gray-800 ${
                dim === "hour" ? "bg-blue-500" : ""
              }`}
              onClick={() => {
                setDim("hour");
              }}
            ></div>
            <p>小时</p>
          </div>
          {/* 天 */}
          <div className="h-full w-20 flex justify-center items-center gap-2 ">
            <div
              className={`h-4 w-4 rounded-full border border-gray-800 ${
                dim === "day" ? "bg-blue-500" : ""
              }`}
              onClick={() => {
                setDim("day");
              }}
            ></div>
            <p>天</p>
          </div>
        </div>
      </div>
      {/* 图表区 */}
      <div className="h-80 w-full flex-grow min-h-0 flex justify-center items-center bg-pink-10 pt-3 ">
        <Char></Char>
      </div>
    </div>
  );
}

// 趋势图
// props : data
function Char(props) {
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
      left: "5%",
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
        start: 50,
        end: 100,
      },
      {
        start: 50,
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
