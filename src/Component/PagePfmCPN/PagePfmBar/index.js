import React from "react";

// props : index url fp fcp domReady
export default function PagePfmBar(props) {
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
      {/* 首屏绘制时间 */}
      <div className="h-full w-2/12 flex-grow flex justify-center items-center text-gray-600 ">
        {props.fp}
      </div>
      {/* 首屏内容绘制时间 */}
      <div className="h-full w-2/12 flex-grow flex justify-center items-center text-gray-600  ">
        {props.fcp}
      </div>
      {/* 页面解析完成的时间 */}
      <div className="h-full w-2/12 flex-grow flex justify-center items-center text-gray-600  ">
        {props.domReady}
      </div>
    </div>
  );
}
