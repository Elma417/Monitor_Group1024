import React, { useState, useEffect } from "react";
// import ReactDOM from 'react-dom';
import { Area } from "@ant-design/plots";

//页面性能图表
function PagePfmChar() {
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
  };

  return <Area {...config} />;
}
export default PagePfmChar;

// ReactDOM.render(<DemoArea />, document.getElementById('container'));

// [
//   {
//     time: "11:04",
//     fp: 508,
//     fcp: 2600,
//     DOM_ready: 4180,
//   },
//   {
//     time: "11:06",
//     fp: 583,
//     fcp: 3009,
//     DOM_ready: 6160,
//   },
//   {
//     time: "11:08",
//     fp: 468,
//     fcp: 2710,
//     DOM_ready: 5880,
//   },
//   {
//     time: "11:10",
//     fp: 609,
//     fcp: 2217,
//     DOM_ready: 5009,
//   },
// ]
