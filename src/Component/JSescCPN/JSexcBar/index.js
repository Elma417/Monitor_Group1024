import React from "react";

// props : index content num
export default function JSexcBar(props) {
  return (
    <div className="h-12 w-full flex justify-start items-center shrink-0">
      {/* 标号 */}
      <div className="h-full w-14 flex justify-center items-center text-gray-600">
        {props.index}
      </div>
      {/* JS异常内容 */}
      <div className="h-full w-9/12 flex justify-start items-center text-gray-600">
        {props.content}
      </div>
      {/* 异常次数 */}
      <div className="h-full w-2/12 flex-grow flex justify-center items-center text-gray-600">
        {props.num}
      </div>
    </div>
  );
}
