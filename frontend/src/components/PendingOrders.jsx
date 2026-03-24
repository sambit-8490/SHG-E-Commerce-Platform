import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBox } from "@fortawesome/free-solid-svg-icons";
import OrderItemCard from "./OrderItemCard";

const PendingOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    const fetchPendingOrders = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/user_orders/pending_orders/",
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        setOrders(response.data["order_items_list"] || []);
      } catch (error) {
        console.error("Error fetching orders", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPendingOrders();
  }, [token]);

  if (loading)
    return (
      <div className="p-10 text-center italic text-gray-500">
        Loading your orders...
      </div>
    );

  return (
    <div className="space-y-8">
      <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
        <h2 className="text-3xl font-black text-[#111827] mb-2">
          Pending Orders
        </h2>
        <p className="text-gray-500">
          Track your items currently in process or transit.
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white p-20 rounded-[2.5rem] text-center border border-dashed border-gray-200">
          <FontAwesomeIcon
            icon={faBox}
            className="text-gray-200 text-6xl mb-4"
          />
          <p className="text-gray-400 font-medium">No pending orders found.</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {orders.map((order, index) => (
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

export default PendingOrders;
