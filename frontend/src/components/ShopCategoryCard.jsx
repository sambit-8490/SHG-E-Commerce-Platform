import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "motion/react";

const ShopCategoryCard = ({ Logo, CategoryType }) => {
  return (
    <>
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <div className="bg-[#333333] rounded-lg text-center w-45 py-12 shadow-2xl">
          <div>
            <FontAwesomeIcon className="text-3xl text-[#F5C469]" icon={Logo} />
          </div>
          <div className="mt-4 text-[#dddddd]">{CategoryType}</div>
        </div>
      </motion.div>
    </>
  );
};

export default ShopCategoryCard;
