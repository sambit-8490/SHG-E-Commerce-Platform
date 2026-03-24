import React from "react";

const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-linear-to-b from-[#333333]  to-[#3d3c3c] to-accent bg-opacity-70 z-50">
      <div className="space-y-3">
        <div className="w-16 h-16 border-4 border-[#F5C469] border-t-transparent rounded-full animate-spin"></div>
        <div>
          <div className="text-[#F5C469] capitalize">loading...</div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
