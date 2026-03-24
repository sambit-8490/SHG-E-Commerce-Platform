import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faUser,
  faBox,
  faIdCard,
  faPhone
} from "@fortawesome/free-solid-svg-icons";
import { motion } from "motion/react";
// import GroupImage from "../assets/ChatGPT Image Oct 22, 2025, 06_20_44 PM.png";
import { useState } from "react";
import GroupViewCard from "./GroupViewCard";

const GroupCard = ({
GroupImage,
GroupImage1,
NameOfShg,
DateOfFormation,
RegistrationNumber,
ContactNumber,
Village,
Taluka,
District,
TypeOfShg,
Address

  // Logo,
}) => {
  const group = {
    groupimage:GroupImage,
    groupimage1:GroupImage1,
    name_of_shg:NameOfShg,
    date_of_formation:DateOfFormation,
    registration_number:RegistrationNumber,
    contact_number:ContactNumber,
    village:Village,
    taluka:Taluka,
    district:District,
    type_of_shg:TypeOfShg,
    address:Address
  };
  const [open, setOpen] = useState(false);
  return (
    <>
    <motion.div whileHover={{ y: -6 }} whileTap={{ scale: 0.97 }} className="h-full">
        <div className="h-full bg-[#FAFAFA] border border-[#2B2B2B] rounded-xl shadow-md flex flex-col overflow-hidden text-[#2B2B2B]">
          
          {/* IMAGE */}
          <div className="h-36 bg-[#EDEDED] overflow-hidden">
            <img
              src={GroupImage1 || `http://127.0.0.1:8000/media/${GroupImage}`}
              alt={NameOfShg}
              className="w-full h-full object-cover"
            />
          </div>

          {/* ACCENT */}
          <div className="h-1.5 bg-[#E6B65C]" />

          {/* CONTENT */}
          <div className="flex-1 px-5 py-5 text-center">
            {/* SHG NAME */}
            <h3 className="font-semibold text-lg line-clamp-2">
              {NameOfShg}
            </h3>

            {/* SHG TYPE */}
            <p className="mt-2 text-sm text-[#6B7280]">
              Type: <span className="font-medium">{TypeOfShg}</span>
            </p>

            {/* LOCATION */}
            <div className="mt-4 flex justify-center items-center gap-2 text-sm">
              <FontAwesomeIcon className="text-[#E6B65C]" icon={faLocationDot} />
              <span className="truncate max-w-[220px]">
                {Village}, {Taluka}, {District}
              </span>
            </div>

            {/* INFO */}
            <div className="mt-5 flex flex-col gap-2 text-sm">
              <div className="flex justify-center items-center gap-2">
                <FontAwesomeIcon className="text-[#E6B65C]" icon={faIdCard} />
                <span>Reg No: {RegistrationNumber}</span>
              </div>

              <div className="flex justify-center items-center gap-2">
                <FontAwesomeIcon className="text-[#E6B65C]" icon={faPhone} />
                <span>{ContactNumber}</span>
              </div>
            </div>

            {/* FORMATION DATE */}
            <p className="mt-4 text-xs text-gray-500">
              Formed on: {DateOfFormation}
            </p>
          </div>

          {/* CTA */}
          <div className="px-5 pb-5">
            <button
              onClick={() => setOpen(true)}
              className="w-full bg-[#E6B65C] text-[#2B2B2B] font-semibold py-3 rounded-lg hover:bg-[#d9a94f] transition"
            >
              <FontAwesomeIcon className="mr-2" icon={faUser} />
              View SHG
            </button>
          </div>
        </div>
      </motion.div>

      {/* MODAL */}
      <GroupViewCard
        isOpen={open}
        group={group}
        onClose={() => setOpen(false)}
      />
      </>
  );
};
export default GroupCard;
