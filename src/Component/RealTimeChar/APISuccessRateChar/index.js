import React, { useState, useEffect } from "react";
// import ReactDOM from 'react-dom';
import { Area } from "@ant-design/plots";

//API成功率
function APISuccessRateChar() {
  const [data, setData] = useState([]);

  useEffect(() => {
    asyncFetch();
  }, []);

  const asyncFetch = () => {
    fetch(
      "https://gw.alipayobjects.com/os/bmw-prod/360c3eae-0c73-46f0-a982-4746a6095010.json"
    )
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.log("fetch data failed", error);
      });
  };
  const config = {
    data,
    xField: "timePeriod",
    yField: "value",
    xAxis: {
      range: [0, 1],
    },
    padding: [20, 20, 20, 20],
    width: "10px",
    height: "100%",
  };

  return <Area {...config} />;
}
export default APISuccessRateChar;

// ReactDOM.render(<DemoArea />, document.getElementById('container'));

//data
// [
//   {
//     time: "11:04",
//     reqNum: 10868,
//     successRate: 0.98,
//   },
//   {
//     time: "11:06",
//     reqNum: 1086,
//     successRate: 0.99,
//   },
//   {
//     time: "11:08",
//     reqNum: 10074,
//     successRate: 0.99,
//   },
//   {
//     time: "11:10",
//     reqNum: 9087,
//     successRate: 0.98,
//   },
//   {
//     time: "11:12",
//     reqNum: 11232,
//     successRate: 1.0,
//   },
// ]
