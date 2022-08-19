import React, { useState, useEffect } from "react";
// import ReactDOM from 'react-dom';
import { DualAxes } from "@ant-design/plots";
import axios from "axios";

//页面访问
function PageAccessChar() {
  const [data, setData] = useState([
    {
      time: "11:04",
      pv: 1200,
      uv: 1178,
    },
    {
      time: "11:06",
      pv: 1649,
      uv: 1600,
    },
    {
      time: "11:08",
      pv: 1292,
      uv: 1230,
    },
    {
      time: "11:10",
      pv: 1200,
      uv: 1167,
    },
    {
      time: "11:12",
      pv: 1649,
      uv: 1543,
    },
  ]);

  useEffect(() => {
    const fetchPageAccessData = async () => {
      const res = await axios.get("http://localhost:3100/PageAccessData");
      setData(res.data);
      console.log("data:" + JSON.stringify(data));
    };
    fetchPageAccessData();
  });

  const config = {
    data: [data, data],
    xField: "time",
    yField: ["pv", "uv"], //图例
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
        geometry: "line",
      },
      {
        geometry: "line",
      },
    ],
  };
  return <DualAxes {...config} />;
}
export default PageAccessChar;

// ReactDOM.render(<DemoLine />, document.getElementById('container'));
