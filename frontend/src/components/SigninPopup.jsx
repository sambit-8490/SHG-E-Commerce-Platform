import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import Loader from "./Loader";

const SigninPopup = ({ onClose, onSuccess, openSignup }) => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      alert("Please enter email and password");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "http://127.0.0.1:8000/loginform/user_login/",
        formData,
      );

      localStorage.setItem("access_token", response.data.access);
      localStorage.setItem("refresh_token", response.data.refresh);

      alert("Login successful");

      setFormData({ email: "", password: "" });
      setLoading(false);

      onSuccess();
    } catch (error) {
      setLoading(false);
      alert("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
        onClick={onClose}
      />

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative bg-[#F5C469] rounded-2xl p-8 w-[90%] max-w-md shadow-2xl z-10"
      >
        {loading && <Loader />}

        {!loading && (
          <>
            <h3 className="capitalize font-bold text-2xl mb-6 text-[#333333] text-center">
              Sign in
            </h3>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block mb-1 text-[#333333]">Email*</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full h-11 rounded-xl px-3 bg-[#dddddd] border border-[#333333]"
                  placeholder="Enter your email"
                />
              </div>

              <div className="mb-5">
                <label className="block mb-1 text-[#333333]">Password*</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full h-11 rounded-xl px-3 bg-[#dddddd] border border-[#333333]"
                  placeholder="Enter your password"
                />
              </div>

              <div className="flex gap-3 mb-4">
                <button
                  type="submit"
                  className="flex-1 bg-[#333333] text-[#F5C469] py-2 rounded-xl font-semibold"
                >
                  Sign in
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 bg-[#dddddd] text-[#333333] py-2 rounded-xl font-semibold"
                >
                  Cancel
                </button>
              </div>

              <div className="text-center text-sm">
                <span className="text-[#333333]">
                  Don&apos;t have an account?
                </span>{" "}
                <button
                  type="button"
                  className="text-blue-600 font-semibold hover:underline"
                  onClick={() => {
                    onClose();
                    openSignup();
                  }}
                >
                  Signup
                </button>
              </div>
            </form>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default SigninPopup;
