import React, { useState, useEffect } from "react";
import PageAccessTrend from "../../Component/PageAccessCPN/PageAccessTrend";
import Details from "../../Component/PageAccessCPN/Details";
import RingChar from "../../Component/RingChar";
import MapChar from "../../Component/MapChar";
import {apiUrl, filterPageAccessData, request, statistics} from "../../utils/api/request";

function PageAccess(props) {
  const [today, setToday] = useState("");

  let pageAccessData = [], accessContentData = {};

  useEffect(() => {
    request(apiUrl.getAll).then(
        (res) => {
          let body = res.body
          for (let key of body) {
            key.detail = JSON.parse(key.detail)
          }
          const { accessContent, pageAccess } = filterPageAccessData(body)
          pageAccessData = pageAccess
          accessContentData = accessContent

          console.log(statistics(pageAccess, 'city'))
        }
    )

    setToday(props.today);
  }, [props.today]);

  return (
    <div className="h-full w-full flex flex-col justify-start items-center bg-gray-200">
      {/* 滚动窗口框（含滚动条） */}
      <div
        className="flex-grow w-full flex flex-col justify-start items-center
      gap-1 overflow-y-scroll"
      >
        {/* 可变长内容 */}
        <div className="h-auto w-full py-3 flex flex-col justify-start items-center bg-gray-20 gap-3">
          {/* 数据可视化大图表 */}
          <div className="h-450 w-11/12 border bg-gray-50 rounded p-2 shrink-0">
            <PageAccessTrend today={today}></PageAccessTrend>
          </div>
          {/* 详情区 */}
          <div className="h-fit max-h-500 w-11/12 rounded shrink-0 mt-3">
            <Details today={today}></Details>
          </div>
          {/* 环形图表区 */}
          <div
            className="h-500 w-11/12 rounded p-2 bg-gray-50 shrink-0 mt-4 flex justify-between items-center
          divide-x-2 divide-gray-200"
          >
            <div className="h-full w-1/2 flex flex-col justify-center items-center p-2">
              <div className="h-12 w-5/6 text-xl text-blue-600 font-bold">
                客户端
              </div>
              <RingChar></RingChar>
            </div>
            <div className="h-full w-1/2 flex flex-col justify-center items-center p-2">
              <div className="h-12 w-5/6 text-xl text-blue-600 font-bold">
                操作系统
              </div>
              <RingChar></RingChar>
            </div>
          </div>
          {/* 地域热力图 */}
          <div className="h-600 w-11/12 rounded p-2 bg-gray-50 shrink-0 mt-4 flex flex-col justify-between items-center">
            <div className="h-12 w-5/6 pt-2 text-xl text-blue-600 font-bold">
              异常地域分布
            </div>
            <div className="flex-grow h-500 w-full min-h-0 ">
              <MapChar></MapChar>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PageAccess;
