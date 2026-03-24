import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faTag,
  faEye,
  faIndianRupeeSign,
} from "@fortawesome/free-solid-svg-icons";
import { motion } from "motion/react";
import axios from "axios";
import ProductViewCard from "./ProductViewCard";

const ProductCard = ({
  image,
  image1,
  ProductName,
  Amount,
  Quantity,
  Description,
  Category,
  productId,
  onRequireLogin,
}) => {
  const product = {
    name: ProductName,
    price: Amount,
    unit: Quantity,
    image: image,
    image1: image1,
    category: Category,
    description: Description,
  };
  const [open, setOpen] = useState(false);
  const handleAddToCart = async () => {
    setOpen(false);
    const token = localStorage.getItem("access_token");

    if (!token) {
      onRequireLogin();
      return;
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/cart/add_to_cart/",
        {
          product_id: productId,
          quantity: 1,
        },

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      alert(response.data.message || "Product added to cart successfully!");
    } catch (error) {
      if (error.response?.status === 401) {
        onRequireLogin(); // open login popup
      } else if (error.response?.data?.message) {
        console.log("Sending productId:", productId);

        alert(error.response.data.message);
      } else {
        alert("Failed to add product to cart");
      }
    }
  };

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        className="w-full sm:w-72"
      >
        <div className="flex flex-col h-full bg-[#2F2F2F] rounded-2xl overflow-hidden">
          <div className="h-44 bg-white">
            <img
              src={image1 || `http://127.0.0.1:8000/media/${image}`}
              alt={ProductName}
              className="w-full h-full object-contain p-4"
            />
          </div>

          <div className="p-4 flex-1 text-left">
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#2F2F2F] bg-[#F5C469] px-3 py-1 rounded-full">
              <FontAwesomeIcon icon={faTag} className="w-3 h-3" />
              {Category}
            </span>

            <h3 className="mt-3 text-white font-semibold text-base leading-tight line-clamp-2">
              {ProductName}
            </h3>

            <p className="mt-2 text-sm text-gray-400 line-clamp-2">
              {Description}
            </p>

            <p className="mt-3 text-sm text-gray-400">
              Stock:{" "}
              <span
                className={`font-medium ${Quantity > 0 ? "text-green-400" : "text-red-400"}`}
              >
                {Quantity > 0 ? Quantity : "Out of stock"}
              </span>
            </p>

            <div className="mt-4 text-2xl font-bold text-[#F5C469] flex items-center gap-1">
              <FontAwesomeIcon icon={faIndianRupeeSign} className="w-4 h-4" />
              {Amount}
            </div>
          </div>

          <div className="p-4 pt-2">
            <button
              onClick={handleAddToCart}
              disabled={Quantity === 0}
              className={`w-full font-bold py-3 rounded-xl transition flex items-center justify-center gap-2
        ${
          Quantity === 0
            ? "bg-gray-500 text-gray-300 cursor-not-allowed"
            : "bg-[#F5C469] text-[#2F2F2F] hover:bg-[#e8b85e]"
        }`}
            >
              <FontAwesomeIcon icon={faCartShopping} />
              Add to Cart
            </button>

            <button
              onClick={() => setOpen(true)}
              className="mt-4 w-full border border-[#F5C469] text-[#F5C469] font-semibold py-2.5 rounded-xl bg-transparent flex items-center justify-center gap-2 hover:bg-[#F5C469]/10 transition"
            >
              <FontAwesomeIcon icon={faEye} />
              View Product
            </button>
          </div>
        </div>
      </motion.div>
      <ProductViewCard
        isOpen={open}
        product={product}
        addToCart={handleAddToCart}
        onClose={() => setOpen(false)}
      />
    </>
  );
};

export default ProductCard;
