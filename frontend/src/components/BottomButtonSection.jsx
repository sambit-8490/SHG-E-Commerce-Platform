import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const BottomButtonSection = ({ setLoading }) => {
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
      <section className="text-center py-14 bg-linear-to-b md:bg-linear-to-r to-[#333333] from-[#F5C469]">
        <div>
          <h2 className="font-bold text-[#dddddd] font-sans text-2xl px-3 md:px-0 md:text-4xl ">
            Ready to Support Local Artisans?
          </h2>
          <p className="text-[#dddddd] md:text-[21px] md:px-100 mt-4">
            Join our community of conscious consumers and help preserve Goan
            traditions while getting authentic products
          </p>
        </div>
        <div className="flex flex-col md:flex-row justify-center items-center gap-5 md:gap-10 text-center pt-8">
          <button
            className="bg-[#dddddd] capitalize md:text-[17px] py-3 px-8 text-[#333333] border-[#333333] rounded-3xl font-bold border"
            onClick={() => showLoader("/products")}
          >
            start shopping
          </button>
          <button
            className="bg-[#333333] capitalize md:text-[17px] py-3 px-8 text-[#dddddd] rounded-3xl font-bold border border-[#dddddd]"
            onClick={() => showLoader("/registrationform")}
          >
            register your <span className="uppercase">shg</span>
          </button>
        </div>
      </section>
    </>
  );
};
export default BottomButtonSection;
