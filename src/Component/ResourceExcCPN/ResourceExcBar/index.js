import React from "react";

// props : index url num user
export default function ResourceExcBar(props) {
  return (
    <div className="h-12 min-h-fit w-full max-w-full flex justify-start items-center shrink-0">
      {/* 标号 */}
      <div className="h-full w-14 flex justify-center items-center text-gray-600">
        {props.index}
      </div>
      {/* 资源域名 */}
      <a
        className="h-full w-7/12 flex min-h-fit max-w-full justify-start items-center text-gray-600"
        href={props.url}
      >
        {props.url}
      </a>
      {/* 异常次数 */}
      <div className="h-full w-2/12 flex-grow flex justify-center items-center text-gray-600 ">
        {props.num}
      </div>
      {/* 影响用户 */}
      <div className="h-full w-2/12 flex-grow flex justify-center items-center text-gray-600 ">
        {props.user}
      </div>
    </div>
  );
}
