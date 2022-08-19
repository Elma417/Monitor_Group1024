import React, { useState, useEffect } from "react";
import Nav from "../../Component/Nav";
import RealTime from "../RealTime";
import JSexc from "../JSexc";
import APISuccessRate from "../APISuccessRate";
import PagePfm from "../PagePfm";
import ResourceExc from "../ResourceExc";
import WhiteScreen from "../WhiteScreen";
import PageAccess from "../PageAccess";

//页面控制
function AppPage() {
  const [pageChoice, setPageChoice] = useState(3);
  const [today, setToday] = useState("");
  const [year, setYear] = useState(0);
  const [month, setMonth] = useState(0);
  const [day, setDay] = useState(0);
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);

  // 获取当前时间
  function getTime() {
    let date = new Date();
    setYear(date.getFullYear());
    setMonth(date.getMonth() + 1);
    setDay(date.getDate());
    setHour(date.getHours());
    setMinute(date.getMinutes());
    let d = `${date.getFullYear()}-${date.getMonth() < 9 ? "0" : ""}${
      date.getMonth() + 1
    }-${date.getDate()}`;
    setToday(d);
  }

  // function getTime() {
  //   let today = new Date();
  //   console.log("today:" + today);

  //   let d = `${today.getFullYear()}-${today.getMonth() < 9 ? "0" : ""}${
  //     today.getMonth() + 1
  //   }-${today.getDate()}`;
  //   setToday(d);
  // }

  useEffect(() => {
    const timer = window.setInterval(() => {
      getTime();
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  });

  return (
    <div className="w-screen h-screen bg-gray-100 flex ">
      {/* 导航栏 */}
      <div className="h-full w-40 min-w-min bg-gray-800">
        <Nav pageChoice={pageChoice} setPageChoice={setPageChoice}></Nav>
      </div>
      {/* 右边页面 */}
      <div className="h-full flex-grow flex flex-col justify-start items-center ">
        {/* 页眉 */}
        <div
          className="h-16 w-full flex-shrink-0 flex justify-start items-center
         text-gray-700 bg-gray-50 px-16 select-none "
        >
          前端异常监控系统
        </div>
        {/* 时间 */}
        <div className="h-12 w-full bg-gray-200 text-gray-600 px-16 flex justify-start items-center shrink-0">
          {`${year} 年 ${month} 月 ${day} 日   ${hour} ：${minute} `}
        </div>
        {/* 数据可视化页面 */}
        <div className="flex-grow flex-shrink w-full flex justify-center items-center min-h-0">
          {pageChoice === 1 && <RealTime today={today}></RealTime>}
          {pageChoice === 2 && <JSexc today={today}></JSexc>}
          {pageChoice === 3 && <APISuccessRate today={today}></APISuccessRate>}
          {pageChoice === 4 && <PagePfm today={today}></PagePfm>}
          {pageChoice === 5 && <ResourceExc today={today}></ResourceExc>}
          {pageChoice === 6 && <WhiteScreen today={today}></WhiteScreen>}
          {pageChoice === 7 && <PageAccess today={today}></PageAccess>}
        </div>
      </div>
    </div>
  );
}

export default AppPage;
