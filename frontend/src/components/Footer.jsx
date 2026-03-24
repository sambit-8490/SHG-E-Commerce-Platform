import React, { useState } from "react";
import logo from "../assets/shg_baazar_logo.png";
import { useNavigate } from "react-router-dom";

const Footer = ({ setLoading }) => {
  const navigate = useNavigate();

  const showLoader = (path) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate(path);
    }, 1500);
  };

  return (
    <>
      <div className="flex flex-col md:flex-row justify-center items-center bg-[#333333] pt-5 md:pb-5 gap-8 md:gap-20 ">
        <div className="text-left  pl-6 md:pl-0 pr-10 md:pr-100">
          <div>
            <img src={logo} className="h-10 w-10 md:w-12 md:h-12" alt="" />
          </div>
          <div className=" text-left flex-wrap pt-3 md:pl-0   text-[#dddddd]">
            <p className="">
              Connecting communities through authentic local products.
            </p>
            <p>Supporting Self Help Groups across Goa.</p>
          </div>
        </div>
        <div className="text-[#dddddd] text-left mr-45 md:mr-0">
          <div className="font-bold text-lg text-[#F5C469]">
            <p>Quick Links</p>
          </div>
          <div className="pt-2 text-left">
            <div className="pt-1">
              <button onClick={() => showLoader("/registrationform")}>
                Register Your Group
              </button>
            </div>
            <div className="pt-1">
              <button onClick={() => showLoader("/products")}>
                Browse Products
              </button>
            </div>
            <div className="pt-1">
              <button onClick={() => showLoader("/snggroups")}>
                SHG Groups
              </button>
            </div>
            <div className="pt-1">
              <button onClick={() => showLoader("/contact")}>Contact</button>
            </div>
            <div className="pt-1">
              <button onClick={() => showLoader("/about")}>About</button>
            </div>
          </div>
        </div>
        <div></div>
      </div>
      <div className="bg-[#000000]  text-center py-4">
        <p className="text-[#FAF9F6] text-wrap md:text-[14px] text-sm">
          © 2025 SHG Bazaar. All rights reserved.
        </p>
      </div>
    </>
  );
};
export default Footer;
