// import React, { useState } from "react";
import NavBtn from "../NavBtn";
import { useNavigate } from "react-router-dom";

//导航栏
// props : pageChoice setPageChoice
function Nav(props) {
  console.log(props.pageChoice);
  let navigate = useNavigate();
  return (
    <div
      className={`w-full h-full flex flex-col flex-grow justify-start items-center
     gap-0 bg-gray-800 `}
    >
      <div className="h-16 w-full bg-gray-800 flex justify-center items-center">
        <svg
          t="1660814116909"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="6070"
          width="40"
          height="40"
        >
          <path
            d="M85.333333 640h853.333334v74.666667a53.393333 53.393333 0 0 1-53.333334 53.333333H619.333333c4.48 73.686667 31.9 108.213333 50.953334 128H704a21.333333 21.333333 0 0 1 0 42.666667H320a21.333333 21.333333 0 0 1 0-42.666667h33.746667c19.053333-19.786667 46.473333-54.313333 50.953333-128H138.666667a53.393333 53.393333 0 0 1-53.333334-53.333333z m853.333334-458.666667v416H85.333333V181.333333a53.393333 53.393333 0 0 1 53.333334-53.333333h746.666666a53.393333 53.393333 0 0 1 53.333334 53.333333zM213.333333 341.333333a42.713333 42.713333 0 0 1 42.666667-42.666666h64a21.333333 21.333333 0 0 0 0-42.666667h-64a85.333333 85.333333 0 0 0 0 170.666667 42.666667 42.666667 0 0 1 0 85.333333h-64a21.333333 21.333333 0 0 0 0 42.666667h64a85.333333 85.333333 0 0 0 0-170.666667 42.713333 42.713333 0 0 1-42.666667-42.666667z m418.993334-80.386666a21.333333 21.333333 0 0 0-30.046667 2.726666L512 372 421.72 263.673333a21.333333 21.333333 0 1 0-32.773333 27.333334L484.226667 405.333333 388.946667 519.673333a21.333333 21.333333 0 0 0 32.773333 27.333334l213.333333-256a21.333333 21.333333 0 0 0-2.726666-30.06zM725.333333 341.333333a42.713333 42.713333 0 0 1 42.666667-42.666666h64a21.333333 21.333333 0 0 0 0-42.666667h-64a85.333333 85.333333 0 0 0 0 170.666667 42.666667 42.666667 0 0 1 0 85.333333h-64a21.333333 21.333333 0 0 0 0 42.666667h64a85.333333 85.333333 0 0 0 0-170.666667 42.713333 42.713333 0 0 1-42.666667-42.666667z"
            fill="#e5e7eb"
            p-id="6071"
            data-spm-anchor-id="a313x.7781069.0.i6"
            class="selected"
          ></path>
        </svg>
      </div>
      <NavBtn
        btn_name={"实时大盘"}
        svg={true}
        thisPage={1}
        pageChoice={props.pageChoice}
        setPageChoice={props.setPageChoice}
        click={() => {
          navigate("/");
        }}
      ></NavBtn>

      <NavBtn
        btn_name={"JS异常"}
        svg={false}
        thisPage={2}
        pageChoice={props.pageChoice}
        setPageChoice={props.setPageChoice}
        click={() => {
          navigate("/JSexc");
        }}
      ></NavBtn>

      <NavBtn
        btn_name={"API请求"}
        svg={false}
        thisPage={3}
        pageChoice={props.pageChoice}
        setPageChoice={props.setPageChoice}
        click={() => {
          navigate("/APISuccessRate");
        }}
      ></NavBtn>

      <NavBtn
        btn_name={"页面性能"}
        svg={false}
        thisPage={4}
        pageChoice={props.pageChoice}
        setPageChoice={props.setPageChoice}
        click={() => {
          navigate("/PagePfm");
        }}
      ></NavBtn>

      <NavBtn
        btn_name={"资源异常"}
        svg={false}
        thisPage={5}
        pageChoice={props.pageChoice}
        setPageChoice={props.setPageChoice}
        click={() => {
          navigate("/ResourceExc");
        }}
      ></NavBtn>

      <NavBtn
        btn_name={"白屏异常"}
        svg={false}
        thisPage={6}
        pageChoice={props.pageChoice}
        setPageChoice={props.setPageChoice}
        click={() => {
          navigate("/WhiteScreen");
        }}
      ></NavBtn>

      <NavBtn
        btn_name={"页面访问"}
        svg={false}
        thisPage={7}
        pageChoice={props.pageChoice}
        setPageChoice={props.setPageChoice}
        click={() => {
          navigate("/PageAccess");
        }}
      ></NavBtn>
    </div>
  );
}

export default Nav;
