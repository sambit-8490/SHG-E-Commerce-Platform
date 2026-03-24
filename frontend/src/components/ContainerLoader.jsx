import React from "react";

const ContainerLoader = () => {
  return (
    <>
      <div className="flex justify-center items-center h-120 gap-2">
        <div
          className="w-4 h-4 md:w-6 md:h-6 bg-[#F5C469] rounded-full animate-bounce"
          style={{ animationDelay: "0s" }}
        ></div>
        <div
          className="w-4 h-4 md:w-6 md:h-6 bg-[#F5C469] rounded-full animate-bounce"
          style={{ animationDelay: "0.2s" }}
        ></div>
        <div
          className="w-4 h-4 md:w-6 md:h-6 bg-[#F5C469] rounded-full animate-bounce"
          style={{ animationDelay: "0.4s" }}
        ></div>
      </div>
    </>
  );
};

export default ContainerLoader;
