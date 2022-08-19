import React from "react";

// props : index url num successRate consume
export default function APISuccessBar(props) {
  return (
    <div className="h-12 w-full flex justify-start items-center shrink-0">
      {/* 标号 */}
      <div className="h-full w-14 flex justify-center items-center text-gray-600">
        {props.index}
      </div>
      {/* API URL */}
      <div className="h-full w-6/12 flex justify-start items-center text-gray-600 ">
        {props.url}
      </div>
      {/* 请求次数 */}
      <div className="h-full w-2/12 flex-grow flex justify-center items-center text-gray-600 ">
        {props.num}
      </div>
      {/* 成功率 */}
      <div className="h-full w-2/12 flex-grow flex justify-center items-center text-gray-600  ">
        {props.successRate}%
      </div>
      {/* 请求耗时 */}
      <div className="h-full w-2/12 flex-grow flex justify-center items-center text-gray-600  ">
        {props.consume}
      </div>
    </div>
  );
}
