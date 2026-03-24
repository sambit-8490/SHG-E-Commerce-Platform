import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";
import OrderItemCard from "./OrderItemCard";

const OrderHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/user_delivered_orders/delivered_orders/",
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        setHistory(response.data["delivered_items_list"] || []);
      } catch (error) {
        console.error("Error fetching order history", error);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, [token]);

  if (loading)
    return (
      <div className="p-10 text-center italic text-gray-500">
        Loading your history...
      </div>
    );

  return (
    <div className="space-y-8">
      <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-black text-gray-900">Order History</h2>
          <p className="text-gray-500 mt-1">
            Review your past purchases and SHG contributions.
          </p>
        </div>
        <div className="hidden md:block">
          <FontAwesomeIcon
            icon={faBagShopping}
            className="text-gray-100 text-5xl"
          />
        </div>
      </div>

      {history.length === 0 ? (
        <div className="bg-white p-20 rounded-[2.5rem] text-center border border-dashed border-gray-200">
          <p className="text-gray-400 font-medium">
            No completed orders found in your history.
          </p>
        </div>
      ) : (
        <div className="grid gap-6">
          {history.map((order, index) => (
            <OrderItemCard
              key={index}
              productName={order["product_id__product_name"]}
              category={order["product_id__category"]}
              image={order["product_id__image"]}
              quantity={order["quantity"]}
              priceAtOrder={order["price_at_time_of_order"]}
              description={order["product_id__description"]}
              delivered_order={order["delivered_order"]}
              shipped_order={order["shipped_order"]}
              action={order["action"]}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
