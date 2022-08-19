import React, { useState, useEffect } from "react";
// import ReactDOM from 'react-dom';
import { Line } from "@ant-design/plots";
import axios from "axios";

//白屏异常图表
function WhiteScreenChar() {
  const [data, setData] = useState([
    {
      time: "11:04",
      WhiteScreenNum: 0,
    },
    {
      time: "11:06",
      WhiteScreenNum: 1,
    },
    {
      time: "11:08",
      WhiteScreenNum: 0,
    },
    {
      time: "11:10",
      WhiteScreenNum: 0,
    },
    {
      time: "11:12",
      WhiteScreenNum: 2,
    },
    {
      time: "11:14",
      WhiteScreenNum: 1,
    },
    {
      time: "11:16",
      WhiteScreenNum: 0,
    },
    {
      time: "11:18",
      WhiteScreenNum: 0,
    },
    {
      time: "11:20",
      WhiteScreenNum: 1,
    },
  ]);

  useEffect(() => {
    const fetchWhiteScreenData = async () => {
      const res = await axios.get("http://localhost:3100/WhiteScreenData");
      setData(res.data);
      console.log("data:" + JSON.stringify(data));
    };
    fetchWhiteScreenData();
  });

  const config = {
    data,
    xField: "time",
    yField: "WhiteScreenNum",
    label: {},
    point: {
      size: 5,
      shape: "diamond",
      style: {
        fill: "white",
        stroke: "#5B8FF9",
        lineWidth: 2,
      },
    },
    tooltip: {
      showMarkers: false,
    },
    state: {
      active: {
        style: {
          shadowBlur: 4,
          stroke: "#000",
          fill: "red",
        },
      },
    },
    interactions: [
      {
        type: "marker-active",
      },
    ],
  };
  return <Line {...config} />;
}

export default WhiteScreenChar;

// ReactDOM.render(<WhiteScreenChar />, document.getElementById('container'));
