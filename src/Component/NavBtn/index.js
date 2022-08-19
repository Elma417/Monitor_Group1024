//导航栏按钮
//props : btn_name svg thisPage pageChoice setPageChoice
function NavBtn(props) {
  return (
    <div
      className={`h-14 w-full flex justify-center items-center
    transform  rounded-sm duration-300 
    ${props.thisPage !== props.pageChoice ? "hover:bg-gray-700" : ""} 
    ${props.thisPage === props.pageChoice ? "bg-blue-600" : "bg-gray-800"} `}
      onClick={() => {
        props.setPageChoice(props.thisPage);
        props.click();
      }}
    >
      <div className="h-full w-6 flex justify-center items-center ">
        {props.svg && (
          <svg
            t="1658994819690"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="2011"
            width="32"
            height="32"
          >
            <path
              d="M886.7 449.2c-20.5-48.4-49.8-91.9-87.1-129.3-37.3-37.3-80.8-66.7-129.3-87.1-50.1-21.2-103.4-32-158.3-32s-108.1 10.8-158.3 32c-48.4 20.5-91.9 49.8-129.3 87.1s-66.7 80.8-87.1 129.3c-21.2 50.1-32 103.4-32 158.3h46c0-198.9 161.8-360.7 360.7-360.7s360.7 161.8 360.7 360.7h46c0-54.8-10.8-108.1-32-158.3zM205.1 777.1H817v46H205.1z"
              p-id="2012"
              fill="#e6e6e6"
            ></path>
            <path
              d="M493.7 712.6l88.2 0.6-0.6-88.2-229.2-141.5 141.6 229.1z m41.9-45.7l-16.1-0.1-25.8-41.8
       41.8 25.8 0.1 16.1zM191.7 649.3h64v46h-64zM248.333 442.22l32.526-32.527 45.255 
       45.255-32.527 32.526zM696.93 454.961l45.255-45.254 32.527 32.526-45.255 45.255zM488.8
        288.4h46v63.8h-46zM767.8 649.3h64v46h-64z"
              p-id="2013"
              fill="#e6e6e6"
            ></path>
          </svg>
        )}
      </div>
      <div
        className="h-full w-8/12 px-3 bg-red-30 flex justify-start items-center
       text-gray-100 text-center select-none"
      >
        {props.btn_name}
      </div>
    </div>
  );
}

export default NavBtn;
