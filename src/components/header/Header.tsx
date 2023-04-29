import logo from 'assets/images/logo.png';
import React from 'react';
export const Header = () => {
  return (
    <div
      data-testid="header"
      className="h-16 font-robot flex justify-between p-2 px-5 items-center w-full z-20 bg-black"
    >
      <div className="flex items-center">
        <img className=" h-[45px]" src={logo} alt="LCCWQ logo" />
        <div className="absolute left-[4%] w-0.5 h-[45px] bg-white"></div>
        <p className="font-roboto text-white text-[30px] ml-[35px] font-bold">
          Leetcode company wise questions
        </p>
      </div>
    </div>
  );
};
