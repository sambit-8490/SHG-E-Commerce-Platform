import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faMinus,
  faPlus,
  faArrowLeft,
  faBagShopping,
} from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/NavBar";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");

  const fetchCart = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/userform/cart/",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const formattedData = (response.data.cart_items || []).map((item) => ({
        id: item.product_id__id,
        name: item.product_id__product_name,
        price: Number(item.product_id__price) || 0,
        image: item.product_id__image,
        quantity: Number(item.quantity) || 0,
      }));

      setCartItems(formattedData);
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (error) {
      console.error("Error fetching cart", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/signup");
    } else {
      fetchCart();
    }
  }, [token]);

  const updateQuantity = async (productId, currentQty, delta) => {
    if (currentQty + delta < 1) return;
    try {
      await axios.post(
        "http://127.0.0.1:8000/userform/add_to_cart/",
        { product_id: productId, quantity: delta },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchCart();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to update quantity");
    }
  };

  const removeItem = async (productId) => {
    try {
      await axios.post(
        "http://127.0.0.1:8000/userform/remove_from_cart/",
        { product_id: productId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchCart();
    } catch (error) {
      alert("Failed to remove item");
    }
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#FDFDFD]">
          <div className="w-12 h-12 border-4 border-[#F5C469] border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-[#333333] font-medium tracking-widest uppercase text-sm italic">
            Synchronizing...
          </p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="pt-32 pb-20 min-h-screen bg-[#F9F9F9] px-6 md:px-16 lg:px-24 text-[#333333]">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="max-w-7xl mx-auto"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <button
                onClick={() => navigate("/")}
                className="group flex items-center gap-2 text-gray-400 hover:text-[#333333] transition-all mb-4 text-sm font-bold uppercase tracking-widest"
              >
                <FontAwesomeIcon
                  icon={faArrowLeft}
                  className="group-hover:-translate-x-1 transition-transform"
                />
                Back to Bazaar
              </button>
              <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase">
                Your Bag{" "}
                <span className="text-[#F5C469] text-2xl ml-2">
                  ({cartItems.length})
                </span>
              </h1>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8">
              <AnimatePresence mode="popLayout">
                {cartItems.length === 0 ? (
                  <div className="bg-white p-20 rounded-3xl shadow-sm text-center border border-gray-100 flex flex-col items-center">
                    <FontAwesomeIcon
                      icon={faBagShopping}
                      className="text-gray-100 text-8xl mb-6"
                    />
                    <p className="text-gray-500 text-xl font-light italic">
                      Your bag is empty.
                    </p>
                    <button
                      onClick={() => navigate("/")}
                      className="mt-8 px-10 py-4 bg-[#333333] text-white rounded-full font-bold hover:bg-[#F5C469] hover:text-[#333333] transition-all uppercase tracking-widest text-xs"
                    >
                      Start Exploring
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {cartItems.map((item) => (
                      <motion.div
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        key={item.id}
                        className="group bg-white p-6 rounded-[2.5rem] shadow-sm flex flex-col sm:flex-row items-center gap-8 border border-gray-50 overflow-hidden"
                      >
                        <div className="w-32 h-32 shrink-0 overflow-hidden rounded-2xl bg-gray-50 border border-gray-100">
                          <img
                            src={`http://127.0.0.1:8000/media/${item.image}`}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            alt={item.name}
                            onError={(e) => {
                              e.target.src =
                                "https://via.placeholder.com/150";
                            }}
                          />
                        </div>
                        <div className="flex-1 w-full">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-bold text-2xl uppercase tracking-tight">
                              {item.name}
                            </h3>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-gray-300 hover:text-red-500 transition-colors p-2"
                            >
                              <FontAwesomeIcon icon={faTrash} />
                            </button>
                          </div>
                          <p className="text-[#F5C469] font-black text-xl mb-6">
                            ₹{item.price}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-6 bg-[#F9F9F9] px-6 py-2 rounded-xl border border-gray-100">
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity, -1)
                                }
                                className="text-gray-400 hover:text-[#333333]"
                              >
                                <FontAwesomeIcon icon={faMinus} size="sm" />
                              </button>
                              <span className="font-black text-lg w-4 text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity, 1)
                                }
                                className="text-gray-400 hover:text-[#F5C469]"
                              >
                                <FontAwesomeIcon icon={faPlus} size="sm" />
                              </button>
                            </div>
                            <p className="font-black text-2xl">
                              ₹
                              {(item.price * item.quantity).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </AnimatePresence>
            </div>

            <div className="lg:col-span-4">
              <div className="bg-[#333333] text-white p-10 rounded-[2.5rem] shadow-2xl sticky top-36 border border-[#444444]">
                <h2 className="text-3xl font-black mb-8 italic uppercase underline decoration-[#F5C469] decoration-4 underline-offset-8">
                  Order <span className="text-[#F5C469]">Details</span>
                </h2>

                <div className="pt-8 mt-4 border-t border-white/10 flex justify-between items-end">
                  <div>
                    <p className="text-xs text-gray-400 uppercase font-black tracking-[0.2em] mb-1">
                      Total Payable
                    </p>
                    <p className="text-4xl font-black text-[#F5C469]">
                      ₹{totalPrice.toLocaleString()}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() =>
                    navigate("/payment", {
                      state: { amount: totalPrice },
                    })
                  }
                  disabled={cartItems.length === 0}
                  className="group w-full mt-10 bg-[#F5C469] text-[#333333] font-black py-5 rounded-2xl hover:bg-white transition-all transform active:scale-95 uppercase tracking-widest text-sm flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  Secure Checkout
                  <FontAwesomeIcon
                    icon={faArrowLeft}
                    className="rotate-180 group-hover:translate-x-2 transition-transform"
                  />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default CartPage;
