import React, { useState, useEffect } from "react";
// import ReactDOM from "react-dom";
// import { DualAxes } from "@ant-design/plots";
// import axios from "axios";

// JS异常页面趋势图组件
// props : today(string)
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
      <div className="h-80 w-full flex-grow min-h-min flex justify-center items-center overflow-hidden bg-pink-100 "></div>
    </div>
  );
}

// Char
// const JSexcChar = () => {
//   const [data, setData] = useState([
//     {
//       time: "11:04",
//       JSexcNum: 10868,
//       pv: 2000,
//     },
//     {
//       time: "11:06",
//       JSexcNum: 1086,
//       pv: 649,
//     },
//     {
//       time: "11:08",
//       JSexcNum: 10074,
//       pv: 1292,
//     },
//     {
//       time: "11:10",
//       JSexcNum: 9087,
//       pv: 1200,
//     },
//     {
//       time: "11:12",
//       JSexcNum: 11232,
//       pv: 1649,
//     },
//     {
//       time: "11:14",
//       JSexcNum: 10868,
//       pv: 2000,
//     },
//     {
//       time: "11:16",
//       JSexcNum: 1086,
//       pv: 649,
//     },
//     {
//       time: "11:18",
//       JSexcNum: 10074,
//       pv: 1292,
//     },
//     {
//       time: "11:20",
//       JSexcNum: 9087,
//       pv: 1200,
//     },
//     {
//       time: "11:22",
//       JSexcNum: 11232,
//       pv: 1649,
//     },
//   ]);
//   const [startTime, setStartTime] = useState("");
//   const [endTime, setEndTime] = useState("");

//   // 获取当前时间
//   function getTime() {
//     let date = new Date();
//     console.log("date:" + date);

//     let et = `${date.getFullYear()}-${
//       date.getMonth() + 1
//     }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
//     setEndTime(et);

//     let st = `${date.getFullYear()}-${
//       date.getMonth() + 1
//     }-${date.getDate()} 0:0`;
//     setStartTime(st);

//     console.log("et:" + et);
//   }

//   useEffect(() => {
//     const timer = window.setInterval(() => {
//       getTime();
//     }, 2000);
//     //request
//     const fetchJSexcData = async () => {
//       const res = await axios.get("http://localhost:3100/JSexcData", {
//         params: {
//           startTime: startTime,
//           endTime: endTime,
//           dim: "min",
//         },
//       });
//       setData(res.data);
//       //终端打印查看
//       console.log("data:" + JSON.stringify(data));
//     };
//     fetchJSexcData();
//     //delete timer
//     return () => {
//       clearInterval(timer);
//     };
//   }, []);

//   const config = {
//     data: [data, data],
//     width: 1500,
//     height: 450,
//     autoFit: false,
//     xField: "time",
//     yField: ["JSexcNum", "pv"], //图例
//     limitInPlot: false,
//     padding: [20, 20, 70, 30],
//     // 需要设置底部 padding 值，同 css
//     slider: {},
//     meta: {
//       time: {
//         sync: false, // 开启之后 slider 无法重绘
//       },
//       JSexcNum: {
//         alias: "JS异常数量",
//       },
//       pv: {
//         alias: "页面访问量",
//       },
//     },
//     geometryOptions: [
//       {
//         geometry: "column",
//       },
//       {
//         geometry: "line",
//       },
//     ],
//   };
//   return <DualAxes {...config} />;
// };
