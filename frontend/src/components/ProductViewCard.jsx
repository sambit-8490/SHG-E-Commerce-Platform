import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faCartShopping,
  faTag,
  faIndianRupeeSign,
} from "@fortawesome/free-solid-svg-icons";

const ProductViewCard = ({ isOpen, onClose, product, addToCart }) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="absolute inset-0 bg-black/60" onClick={onClose} />

        <div className="relative z-10 w-[92%] max-w-4xl bg-white rounded-2xl overflow-hidden shadow-2xl">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-black"
          >
            <FontAwesomeIcon icon={faXmark} className="text-xl" />
          </button>

          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 bg-[#F3F3F3] flex items-center justify-center p-6">
              <img
                src={
                  product.image1 ||
                  `http://127.0.0.1:8000/media/${product.image}`
                }
                alt={product.name}
                className="max-h-[420px] object-contain"
              />
            </div>

            <div className="md:w-1/2 p-8 flex flex-col">
              <div className="flex items-center gap-2 text-sm text-gray-400 uppercase tracking-wide">
                <FontAwesomeIcon icon={faTag} />
                {product.category}
              </div>

              <h2 className="mt-2 text-2xl font-semibold text-[#2F2F2F]">
                {product.name}
              </h2>

              <p className="mt-4 text-gray-600 leading-relaxed">
                {product.description}
              </p>

              <div className="mt-6 flex items-end gap-2">
                <span className="text-3xl font-bold text-[#F5C469] flex items-center gap-1">
                  <FontAwesomeIcon icon={faIndianRupeeSign} />
                  {product.price}
                </span>
                <span className="text-gray-500">/ {product.unit}</span>
              </div>

              <div className="mt-auto pt-8 flex gap-4">
                <button
                  onClick={addToCart}
                  className="
              flex-1
              flex
              items-center
              justify-center
              gap-2
              bg-[#F5C469]
              text-[#2F2F2F]
              font-bold
              py-3
              rounded-xl
              hover:bg-[#f3b84f]
              transition
            "
                >
                  <FontAwesomeIcon icon={faCartShopping} />
                  Add to Cart
                </button>

                <button
                  onClick={onClose}
                  className="
              flex-1
              flex
              items-center
              justify-center
              gap-2
              border
              border-gray-300
              text-gray-600
              py-3
              rounded-xl
              hover:bg-gray-100
              transition
            "
                >
                  <FontAwesomeIcon icon={faXmark} />
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductViewCard;
