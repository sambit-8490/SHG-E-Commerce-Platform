import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import Loader from "./Loader";

const SignupPopup = ({ onClose }) => {
  const [loading, setLoading] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");

  const [formData, setFormData] = useState({
    customer_name: "",
    email: "",
    phone_number: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.customer_name) {
      alert("Please enter your name!");
      return;
    }
    if (!formData.email) {
      alert("Please enter your email!");
      return;
    }
    if (formData.phone_number.length < 10) {
      alert("Phone number must be at least 10 digits!");
      return;
    }
    if (formData.password.length < 8) {
      alert("Password must be minimum 8 characters!");
      return;
    }
    if (formData.password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      setLoading(true);

      await axios.post(
        "http://127.0.0.1:8000/userform/user_registration_form/",
        formData,
      );

      const loginResponse = await axios.post(
        "http://127.0.0.1:8000/loginform/user_login/",
        {
          email: formData.email,
          password: formData.password,
        },
      );

      localStorage.setItem("access_token", loginResponse.data.access);
      localStorage.setItem("refresh_token", loginResponse.data.refresh);

      alert("Signup successful!");

      setLoading(false);

      window.location.reload();
    } catch (error) {
      setLoading(false);
      console.error(error);
      alert("Signup failed. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-[1.5px]"
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
              Sign up
            </h3>

            <form onSubmit={handleSubmit} className="text-center">
              <input
                name="customer_name"
                placeholder="Enter your name"
                value={formData.customer_name}
                onChange={handleChange}
                className="w-full h-11 mb-4 rounded-xl px-3 bg-[#dddddd] border border-[#333333]"
              />

              <input
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="w-full h-11 mb-4 rounded-xl px-3 bg-[#dddddd] border border-[#333333]"
              />

              <input
                name="phone_number"
                placeholder="Enter your phone number"
                value={formData.phone_number}
                onChange={handleChange}
                className="w-full h-11 mb-4 rounded-xl px-3 bg-[#dddddd] border border-[#333333]"
              />

              <input
                name="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className="w-full h-11 mb-4 rounded-xl px-3 bg-[#dddddd] border border-[#333333]"
              />

              <input
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full h-11 mb-6 rounded-xl px-3 bg-[#dddddd] border border-[#333333]"
              />

              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex-1 bg-[#333333] text-[#F5C469] py-2 rounded-xl font-semibold"
                >
                  Sign up
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 bg-[#dddddd] text-[#333333] py-2 rounded-xl font-semibold"
                >
                  Cancel
                </button>
              </div>
            </form>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default SignupPopup;
