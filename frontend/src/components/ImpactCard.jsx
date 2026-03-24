import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ImpactCard = ({ TotalNumber, CardText, Logo }) => {
  return (
    <>
      <div className="bg-[#333333] rounded-lg text-center w-75 pb-5">
        <div>
          <FontAwesomeIcon className="text-3xl  text-[#F5C469]" icon={Logo} />
        </div>
        <div className="text-center">
          <h3 className="mt-2 font-bold text-3xl  text-[#dddddd]">
            {TotalNumber}+
          </h3>
          <p className="mt-2  text-[#dddddd]">{CardText}</p>
        </div>
      </div>
    </>
  );
};
export default ImpactCard;
