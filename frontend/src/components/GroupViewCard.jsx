import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faIdCard,
  faPhone,
  faCalendarDays,
  faHouse,
  faBuilding,
  faLocationDot,
  faTag,
  faMapLocationDot,
} from "@fortawesome/free-solid-svg-icons";

const GroupViewCard = ({ isOpen, onClose, group}) => {
  if (!isOpen) return null;

  return (
   <>
   <div className="fixed inset-0 z-50 flex items-center justify-center">
  {/* BACKDROP */}
  <div className="absolute inset-0 bg-black/60" onClick={onClose} />

  {/* MODAL */}
  <div className="relative z-10 w-[92%] max-w-4xl bg-white rounded-2xl overflow-hidden shadow-2xl">
    
    {/* CLOSE */}
    <button
      onClick={onClose}
      className="absolute top-4 right-4 text-gray-400 hover:text-black text-xl"
    >
      ✕
    </button>

    <div className="flex flex-col md:flex-row">
      
      {/* LEFT IMAGE */}
      <div className="md:w-1/2 bg-[#EDEDED] flex items-center justify-center p-6">
        <img
          src={group.groupimage1 || `http://127.0.0.1:8000/media/${group.groupimage}`}
          alt="SHG"
          className="max-h-[400px] w-full object-cover rounded-lg"
        />
      </div>

      {/* RIGHT CONTENT */}
      <div className="md:w-1/2 p-8 flex flex-col">

        {/* NAME */}
        <h2 className="text-2xl font-semibold text-[#2B2B2B]">
          {group.name_of_shg}
        </h2>

        {/* TYPE */}
        <div className="mt-3 flex items-center gap-2 text-sm">
          <FontAwesomeIcon icon={faTag} className="text-[#E6B65C]" />
          <span className="font-medium">Type Of SHG:</span>
          <span className="text-gray-600">{group.type_of_shg}</span>
        </div>

        {/* DETAILS */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">

          <div className="flex gap-3">
            <FontAwesomeIcon icon={faIdCard} className="text-[#E6B65C] mt-1" />
            <div>
              <p className="font-medium">Registration Number</p>
              <p className="text-gray-600">{group.registration_number}</p>
            </div>
          </div>

          <div className="flex gap-3">
            <FontAwesomeIcon icon={faPhone} className="text-[#E6B65C] mt-1" />
            <div>
              <p className="font-medium">Contact Number</p>
              <p className="text-gray-600">{group.contact_number}</p>
            </div>
          </div>

          <div className="flex gap-3">
            <FontAwesomeIcon icon={faCalendarDays} className="text-[#E6B65C] mt-1" />
            <div>
              <p className="font-medium">Date Of Formation</p>
              <p className="text-gray-600">{group.date_of_formation}</p>
            </div>
          </div>

          <div className="flex gap-3">
            <FontAwesomeIcon icon={faHouse} className="text-[#E6B65C] mt-1" />
            <div>
              <p className="font-medium">Village</p>
              <p className="text-gray-600">{group.village}</p>
            </div>
          </div>

          <div className="flex gap-3">
            <FontAwesomeIcon icon={faBuilding} className="text-[#E6B65C] mt-1" />
            <div>
              <p className="font-medium">Taluka</p>
              <p className="text-gray-600">{group.taluka}</p>
            </div>
          </div>

          <div className="flex gap-3">
            <FontAwesomeIcon icon={faLocationDot} className="text-[#E6B65C] mt-1" />
            <div>
              <p className="font-medium">District</p>
              <p className="text-gray-600">{group.district}</p>
            </div>
          </div>
        </div>

        {/* ADDRESS */}
        <div className="mt-5 flex gap-3 text-sm">
          <FontAwesomeIcon icon={faMapLocationDot} className="text-[#E6B65C] mt-1" />
          <div>
            <p className="font-medium">Address</p>
            <p className="text-gray-600 leading-relaxed">{group.address}</p>
          </div>
        </div>

        {/* ACTION */}
        <div className="mt-auto pt-6">
          <button
            onClick={onClose}
            className="w-full border border-gray-300 text-gray-600 py-3 rounded-lg hover:bg-gray-100 transition"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  </div>
</div>
   </>
  );
};

export default GroupViewCard;
