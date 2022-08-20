import React, { useState, useEffect } from "react";
import JSexcBar from "../JSexcBar";

// API成功率详情组件
// props : today(string)
export default function Details(props) {
  const [date, setDate] = useState("");
  // const [detailsData, setDetailsData] = useState([]);

  useEffect(() => {
    if (date === "") {
      setDate(props.today);
    }
  }, [date, props.today]);
  return (
    <div className="h-full w-full flex flex-col justify-between items-center">
      {/* 选择时间 */}
      <div className="h-12 w-full px-8 flex justify-start items-center">
        <p>时间：</p>
        <input
          type="date"
          value={date}
          className="px-2 border"
          onChange={(event) => {
            setDate(event.value);
          }}
        ></input>
      </div>
      {/* 异常详情列表 */}
      <div className="flex-grow min-h-0 w-full rounded flex flex-col justify-start items-center">
        {/* 标题 */}
        <div className="h-10 w-full bg-gray-100 rounded-t flex justify-start items-center shrink-0">
          <div
            className="h-full w-10/12 flex justify-start items-center text-gray-500
          tracking-wider font-bold pl-28 "
          >
            异常内容
          </div>
          <div
            className="h-full w-2/12 flex-grow flex justify-start items-center text-gray-500
          tracking-wider font-bold pl-6"
          >
            异常次数
          </div>
        </div>
        {/* 显示窗口 */}
        <div
          className="flex-grow min-h-0 w-full bg-gray-50 rounded-b flex flex-col justify-start items-center
        overflow-y-scroll px-2 pb-2"
        >
          {/* 滚动内容板 */}
          <div className="h-auto w-full flex flex-col justify-start items-center divide-y-2 ">
            {/* 一项 */}
            <div className="h-12 w-full flex justify-start items-center shrink-0">
              {/* 标号 */}
              <div className="h-full w-14 flex justify-center items-center text-gray-600">
                1
              </div>
              {/* JS异常内容 */}
              <div className="h-full w-9/12 flex justify-start items-center text-gray-600">
                TypeError: Failed to fetch
              </div>
              {/* 异常次数 */}
              <div className="h-full w-2/12 flex-grow flex justify-center items-center text-gray-600">
                243
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
