import React, { useState, useEffect } from "react";
// import ReactDOM from "react-dom";
import { DualAxes } from "@ant-design/plots";
import axios from "axios";

//实时大盘 ：JS异常图表
const JSexcChar = () => {
  const [data, setData] = useState([
    {
      time: "11:04",
      JSexcNum: 10868,
      pv: 2000,
    },
    {
      time: "11:06",
      JSexcNum: 1086,
      pv: 649,
    },
    {
      time: "11:08",
      JSexcNum: 10074,
      pv: 1292,
    },
    {
      time: "11:10",
      JSexcNum: 9087,
      pv: 1200,
    },
    {
      time: "11:12",
      JSexcNum: 11232,
      pv: 1649,
    },
  ]);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  // 获取当前时间
  function getTime() {
    let date = new Date();
    console.log("date:" + date);

    let et = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
    setEndTime(et);

    let st = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()} 0:0`;
    setStartTime(st);

    console.log("et:" + et);
  }

  useEffect(() => {
    const timer = window.setInterval(() => {
      getTime();
    }, 2000);
    //request
    const fetchJSexcData = async () => {
      const res = await axios.get("http://localhost:3100/JSexcData", {
        params: {
          startTime: startTime,
          endTime: endTime,
          dim: "min",
        },
      });
      setData(res.data);
      //终端打印查看
      console.log("data:" + JSON.stringify(data));
    };
    fetchJSexcData();
    //delete timer
    return () => {
      clearInterval(timer);
    };
  }, [startTime, endTime, data]);

  const config = {
    data: [data, data],
    xField: "time",
    yField: ["JSexcNum", "pv"], //图例
    limitInPlot: false,
    padding: [20, 20, 20, 20],
    // 需要设置底部 padding 值，同 css
    slider: {},
    meta: {
      time: {
        sync: false, // 开启之后 slider 无法重绘
      },
      JSexcNum: {
        alias: "JS异常数量",
      },
      pv: {
        alias: "页面访问量",
      },
    },
    geometryOptions: [
      {
        geometry: "column",
      },
      {
        geometry: "line",
      },
    ],
  };
  return <DualAxes {...config} />;
};

export default JSexcChar;
// ReactDOM.render(<JSexcChar />, document.getElementById("JSexcContainer"));
