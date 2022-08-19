import React, { useState, useEffect } from "react";
// import ReactDOM from "react-dom";
import { DualAxes } from "@ant-design/plots";
import axios from "axios";

//资源异常图表
const ResourceExcChar = () => {
  const [data, setData] = useState([
    {
      time: "11:04",
      ResourceExcNum: 868,
      pv: 200,
      uv: 198,
    },
    {
      time: "11:06",
      ResourceExcNum: 1086,
      pv: 649,
      uv: 632,
    },
    {
      time: "11:08",
      ResourceExcNum: 1074,
      pv: 292,
      uv: 289,
    },
    {
      time: "11:10",
      ResourceExcNum: 1087,
      pv: 120,
      uv: 108,
    },
    {
      time: "11:12",
      ResourceExcNum: 1123,
      pv: 164,
      uv: 160,
    },
  ]);

  useEffect(() => {
    const fetchResourceExcData = async () => {
      const res = await axios.get("http://localhost:3100/ResourceExcData");
      setData(res.data);
      console.log("data:" + JSON.stringify(data));
    };
    fetchResourceExcData();
  });

  const config = {
    data: [data, data],
    xField: "time",
    yField: ["ResourceExcNum", "pv", "uv"],
    limitInPlot: false,
    padding: [20, 20, 20, 20],
    // 需要设置底部 padding 值，同 css
    slider: {},
    meta: {
      time: {
        sync: false, // 开启之后 slider 无法重绘
      },
    },
    geometryOptions: [
      {
        geometry: "column",
      },
      {
        geometry: "line",
      },
      {
        geometry: "line",
      },
    ],
  };
  return <DualAxes {...config} />;
};

export default ResourceExcChar;
// ReactDOM.render(<JSexcChar />, document.getElementById("JSexcContainer"));
