import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTruck,
  faCheck,
  faXmark,
  faBoxOpen,
  faUser,
  faIndianRupeeSign,
  faCircle,
} from "@fortawesome/free-solid-svg-icons";

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://127.0.0.1:8000/get_shg_orders/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      setOrders(res.data.orders_list || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleUpdate = async (orderId, endpoint, payload) => {
    try {
      const res = await axios.post(
        `http://127.0.0.1:8000/${endpoint}/`,
        { order_id: orderId, ...payload },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        },
      );
      alert(res.data.message);
      fetchOrders();
    } catch (error) {
      alert(
        "Action failed: " +
          (error.response?.data?.message || "Internal Server Error"),
      );
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <header className="bg-white rounded-[2.5rem] shadow-xl p-10 border border-gray-50 flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-black text-gray-900 tracking-tight">
            Order Fulfillment
          </h2>
          <p className="text-gray-500 mt-2 text-lg font-medium">
            Manage logistics and customer satisfaction for your SHG.
          </p>
        </div>
        <div className="bg-[#bfa85f]/10 px-6 py-3 rounded-2xl border border-[#bfa85f]/20">
          <p className="text-[#bfa85f] font-black text-sm uppercase tracking-widest">
            Active Orders: {orders.length}
          </p>
        </div>
      </header>

      <section className="bg-white rounded-[3rem] shadow-2xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#111827] text-[#bfa85f] uppercase text-[10px] tracking-[0.25em] font-black">
                <th className="px-10 py-7">Order Details</th>
                <th className="px-10 py-7">Customer Info</th>
                <th className="px-10 py-7">Financials</th>
                <th className="px-10 py-7">Logistics Status</th>
                <th className="px-10 py-7 text-center">Fulfillment Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr>
                  <td colSpan="5" className="px-10 py-32 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-12 h-12 border-4 border-[#bfa85f] border-t-transparent rounded-full animate-spin" />
                      <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">
                        Accessing Secure Records...
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-gray-50/50 transition-all group"
                  >
                    <td className="px-10 py-8">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-black text-[#bfa85f] mb-1">
                          ID: #{order.id}
                        </span>
                        <span className="text-xl font-black text-gray-900 group-hover:text-[#111827] transition-colors">
                          {order.product_id__product_name}
                        </span>
                        <span className="text-sm text-gray-400 mt-1 font-medium italic">
                          Qty: {order.quantity} Units
                        </span>
                      </div>
                    </td>

                    <td className="px-10 py-8">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-400">
                          <FontAwesomeIcon icon={faUser} size="sm" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-800">
                            {order.customer_id__customer_name || "Member"}
                          </p>
                          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">
                            Registered Buyer
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-10 py-8">
                      <div className="flex flex-col">
                        <span className="text-2xl font-black text-gray-900">
                          <FontAwesomeIcon
                            icon={faIndianRupeeSign}
                            className="text-sm mr-1 text-[#bfa85f]"
                          />
                          {(
                            order.price_at_time_of_order * order.quantity
                          ).toLocaleString()}
                        </span>
                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">
                          Total Value
                        </span>
                      </div>
                    </td>

                    <td className="px-10 py-8">
                      <div
                        className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm 
                      ${
                        order.delivered_order
                          ? "bg-green-100 text-green-700"
                          : order.shipped_order
                            ? "bg-blue-100 text-blue-700"
                            : order.action === "APPROVED"
                              ? "bg-indigo-100 text-indigo-700"
                              : "bg-yellow-100 text-yellow-700"
                      }`}
                      >
                        <FontAwesomeIcon
                          icon={faCircle}
                          className="text-[6px] animate-pulse"
                        />
                        {order.delivered_order
                          ? "Delivered"
                          : order.shipped_order
                            ? "In Transit"
                            : order.action || "Pending Approval"}
                      </div>
                    </td>

                    <td className="px-10 py-8">
                      <div className="flex flex-col gap-2 min-w-[180px]">
                        {!order.action && (
                          <div className="grid grid-cols-2 gap-2">
                            <button
                              onClick={() =>
                                handleUpdate(
                                  order.id,
                                  "approve_or_reject_order",
                                  { action: "APPROVED" },
                                )
                              }
                              className="py-3 bg-green-600 text-white text-[10px] font-black rounded-xl uppercase hover:bg-green-700 shadow-md transition-all active:scale-95"
                            >
                              <FontAwesomeIcon
                                icon={faCheck}
                                className="mr-1"
                              />{" "}
                              Approve
                            </button>
                            <button
                              onClick={() =>
                                handleUpdate(
                                  order.id,
                                  "approve_or_reject_order",
                                  { action: "REJECTED" },
                                )
                              }
                              className="py-3 bg-red-500 text-white text-[10px] font-black rounded-xl uppercase hover:bg-red-600 shadow-md transition-all active:scale-95"
                            >
                              <FontAwesomeIcon icon={faXmark} /> Reject
                            </button>
                          </div>
                        )}

                        {order.action === "APPROVED" &&
                          !order.shipped_order && (
                            <button
                              onClick={() =>
                                handleUpdate(order.id, "is_shipped")
                              }
                              className="w-full py-4 bg-[#111827] text-[#bfa85f] text-[10px] font-black rounded-2xl uppercase hover:bg-gray-800 shadow-lg border border-[#bfa85f]/20 transition-all flex items-center justify-center gap-2"
                            >
                              <FontAwesomeIcon icon={faTruck} /> Dispatch
                              Shipment
                            </button>
                          )}

                        {order.shipped_order && !order.delivered_order && (
                          <button
                            onClick={() =>
                              handleUpdate(order.id, "mark_delivered")
                            }
                            className="w-full py-4 bg-[#bfa85f] text-gray-900 text-[10px] font-black rounded-2xl uppercase hover:bg-[#a18d46] shadow-xl transition-all"
                          >
                            Confirm Delivery
                          </button>
                        )}

                        {order.delivered_order && (
                          <div className="flex items-center justify-center gap-2 text-green-500 font-black text-[10px] uppercase italic">
                            <FontAwesomeIcon icon={faCheck} /> Transaction
                            Finalized
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {orders.length === 0 && !loading && (
            <div className="py-40 text-center flex flex-col items-center gap-6">
              <FontAwesomeIcon
                icon={faBoxOpen}
                className="text-gray-100 text-8xl"
              />
              <div>
                <p className="text-gray-400 text-xl font-black uppercase tracking-widest">
                  No Incoming Requests
                </p>
                <p className="text-gray-300 text-sm font-medium">
                  Customer orders for your group will appear here.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default OrderManagement;
