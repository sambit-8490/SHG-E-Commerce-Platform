import React from "react";
import { Eye } from "lucide-react";

const AdminProductViewCard = ({ product, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      {/* Card */}
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden">
        
        {/* Image */}
        <div className="relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-56 object-cover"
          />

          {/* Status Badge */}
          <span className="absolute top-3 left-3 bg-green-100 text-green-700 text-sm font-semibold px-4 py-1 rounded-full">
            {product.status}
          </span>
        </div>

        {/* Content */}
        <div className="p-6 space-y-3">
          <h2 className="text-2xl font-bold capitalize text-gray-900">
            {product.name}
          </h2>

          <p className="text-sm font-semibold text-blue-600 uppercase">
            {product.category}
          </p>

          <p className="text-gray-600 text-sm">
            {product.description}
          </p>

          {/* Price & Stock */}
          <div className="flex justify-between items-center pt-4">
            <p className="text-2xl font-bold text-gray-900">
              ₹{product.price}
            </p>

            <p className="text-sm text-gray-500">
              Stock: <span className="font-semibold">{product.stock}</span>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 pt-0">
          <button
            onClick={onClose}
            className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white py-3 rounded-xl hover:bg-gray-800 transition"
          >
            <Eye size={18} />
            Close View
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminProductViewCard;
