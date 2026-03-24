import React from "react";

const ProcessCard = ({ Number, Title, Description }) => {
  return (
    <>
      <div className="bg-[#dddddd] text-center w-75">
        <div className="rounded-full  border border-[#dddddd] bg-[#F5C469] py-5 mx-29">
          <p className=" text-[#333333] font-bold text-xl">{Number}</p>
        </div>
        <div className="text-center">
          <h3 className="mt-2 font-bold text-lg text-[#333333]">{Title}</h3>
          <p className="mt-2 text-[#333333]">{Description}</p>
        </div>
      </div>
    </>
  );
};
export default ProcessCard;
