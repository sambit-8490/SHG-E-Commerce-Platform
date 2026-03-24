import React from "react";
import { Edit2, Eye, Trash2 } from "lucide-react";

const AdminProductCard = ({
  image,
  price,
  category,
  stock_quantity,
  product_name,
  status,
  description,
  onEdit,
  onDelete,
  onView
}) => {
  const getStatusClass = (s) => {
    switch (s) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Draft":
        return "bg-yellow-100 text-yellow-800";
      case "Out of Stock":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-transform duration-300 w-full max-w-xs">
      {/* Image */}
      <div className="relative w-full h-48">
        <img
          src={`http://127.0.0.1:8000/media/${image}`}
          alt={product_name}
          className="w-full h-full object-cover"
          onError={(e) =>
            (e.target.src =
              "https://placehold.co/600x400/F5C469/333?text=Image+Unavailable")
          }
        />

        {/* Status Badge */}
        <span
          className={`absolute top-3 left-3 text-xs font-semibold px-3 py-1 rounded-full ${getStatusClass(status || "Active")}`}
        >
          {status || "Active"}
        </span>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col gap-3">
        {/* Product Name */}
        <h3 className="text-lg font-bold text-gray-800 truncate">
          {product_name}
        </h3>

        {/* Category */}
        <p className="text-sm font-medium text-blue-500 uppercase">
          {category}
        </p>

        {/* Description */}
        {description && (
          <p className="text-sm text-gray-600 line-clamp-3">{description}</p>
        )}

        {/* Price & Stock */}
        <div className="flex justify-between items-center">
          <p className="text-xl font-bold text-gray-800">
            ₹{parseFloat(price).toFixed(2)}
          </p>
          <p className="text-sm text-gray-500">
            Stock: <span className="font-semibold">{stock_quantity}</span>
          </p>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-3 gap-2 mt-2">
          <button
            onClick={onEdit}
            className="flex items-center justify-center gap-1 px-2 py-2 text-xs font-semibold rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition"
          >
            <Edit2 size={14} /> Edit
          </button>

          <button 
            onClick={onView}
          className="flex items-center justify-center gap-1 px-2 py-2 text-xs font-semibold rounded-lg bg-gray-700 text-gray-200 hover:bg-gray-800 transition">
            <Eye size={14} /> View
          </button>

          <button
            onClick={onDelete}
            className="flex items-center justify-center gap-1 px-2 py-2 text-xs font-semibold rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
          >
            <Trash2 size={14} /> Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminProductCard;
