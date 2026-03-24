import React, { useState } from "react";
import image from "../assets/ChatGPT_Image_Feb_1__2026__11_02_00_PM-removebg-preview.png";
import { useNavigate } from "react-router-dom";
const MainSection = ({ setLoading }) => {
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
      <section className="md:py-40 py-30 bg-linear-to-t md:bg-linear-to-l to-[#333333] from-[#F5C469]">
        <div className="  flex flex-col md:flex-row  justify-center items-center md:pl-28 font-sans">
          <div>
            <div className="capitalize text-[#dddddd] md:text-6xl text-[32px] text-center md:text-left  font-bold">
              <h2 className="mb-2">discover authentic</h2>
              <h2 className="text-[#F5C469]">Goan Products</h2>
            </div>
            <div className="text-center md:text-left flex-wrap my-8 px-5 md:pr-20 md:px-0">
              <p className="md:text-[22px] text-lg text-[#dddddd]">
                Connect directly with Self Help Groups across Goa. Support local
                artisans, farmers, and entrepreneurs while discovering unique
                handcrafted products.
              </p>
            </div>
            <div className="flex flex-col md:flex-row  md:justify-self-start items-center gap-4 md:gap-8 ">
              <button
                className="bg-[#dddddd] capitalize md:text-[16px] py-3 px-8 text-[#333333] rounded-lg font-bold border border-[#333333]"
                onClick={() => showLoader("/products")}
              >
                start shopping
              </button>
              <button
                className="bg-[#333333] capitalize md:text-[16px] py-3 px-8 text-[#dddddd] rounded-lg font-bold border border-[#dddddd]"
                onClick={() => showLoader("/registrationform")}
              >
                join as <span className="uppercase">shg</span>
              </button>
            </div>
          </div>
          <div className="md:pr-25 md:mt-0 mt-10 text-center">
            <img
              className="h-50 w-80 md:h-110 md:w-345 rounded-2xl"
              src={image}
              alt=""
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default MainSection;
