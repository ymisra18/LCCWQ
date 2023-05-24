import logo from 'assets/images/logo.png';
import React from 'react';
export const Header = () => {
  return (
    <div
      data-testid="header"
      className="h-14 font-robot flex justify-between p-2 px-5 items-center w-full z-20 bg-tableRowEven "
    >
      <div className="flex items-center">
        {/* <img className=" h-[45px]" src={logo} alt="LCCWQ logo" /> */}
        {/* <div className="absolute left-[4%] w-0.5 h-[35px] bg-white"></div> */}
        <p className=" text-headerText text-[30px] ">
          Leetcode Company Wise Questions
        </p>
      </div>
    </div>
  );
};
