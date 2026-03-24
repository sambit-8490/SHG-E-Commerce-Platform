import React from "react";

const OrderItemCard = ({
  productName,
  category,
  image,
  quantity,
  priceAtOrder,
  description,
  delivered_order,
  shipped_order,
  action,
}) => {
 const getStatus = () => {
  if (delivered_order && shipped_order && action === "APPROVED")
    return "Delivered";

  if (shipped_order && !delivered_order && action === "APPROVED")
    return "Shipped";

  if (!shipped_order && !delivered_order && action === "APPROVED")
    return "Approved";

  if (!shipped_order && !delivered_order && action === "REJECTED")
    return "Rejected";

  return "Pending";
}

  const statusColor = {
  Delivered: "text-green-600",
  Shipped: "text-blue-600",
  Approved: "text-yellow-600",
  Rejected: "text-red-600",
  Pending: "text-gray-500",
};

  return (
    <div className="flex gap-4 p-4 border-gray-700 rounded-lg shadow-sm bg-white hover:shadow-md transition">
      <img
        src={`http://127.0.0.1:8000/media/${image}`}
        alt={productName}
        className="w-24 h-24 object-cover rounded"
      />

      <div className="flex-1">
        <h3 className="text-lg font-semibold">{productName}</h3>
        <p className="text-sm text-gray-500">{category}</p>

        <div className="mt-2 flex flex-wrap gap-4 text-sm">
          <span>
            <strong>Qty:</strong> {quantity}
          </span>

          <span>
            <strong>Price:</strong> ₹{priceAtOrder}
          </span>
          <span>
            <strong>Total:</strong> ₹{quantity * priceAtOrder}
          </span>
        </div>
        <div className="flex items-center gap-x-1.5 mt-2">
          <span className="capitalize font-bold">description:</span>
          <p className="text-gray-500">{description}</p>
        </div>
        <div className="flex items-center gap-x-1.5 mt-1">
          <span className="capitalize font-bold">status:</span>
          <p className={`font-semibold text-sm ${statusColor[getStatus()]}`}>{getStatus()}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderItemCard;
