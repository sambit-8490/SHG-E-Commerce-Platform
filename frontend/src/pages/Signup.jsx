import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

const Signup = () => {
  const navigate = useNavigate();

  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    customer_name: "",
    email: "",
    phone_number: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const showLoader = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/signin");
    }, 1500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.customer_name) {
      alert("please enter your name !");
      return;
    }
    if (!formData.email) {
      alert("please enter your email !");
      return;
    }
    if (formData.phone_number.length < 10) {
      alert("contact number length cannot be less than 10 !");
      return;
    }
    if (formData.password.length < 8) {
      alert("password should be minimum 8 characters !");
      return;
    }
    if (formData.password !== confirmPassword) {
      alert("password did not match !");
      return;
    }

    try {
      await axios.post(
        "http://127.0.0.1:8000/userform/user_registration_form/",
        formData,
      );

      alert("form submitted !");
      setFormData({
        customer_name: "",
        email: "",
        phone_number: "",
        password: "",
      });
      setConfirmPassword("");
      navigate("/signin");
    } catch (error) {
      console.error("error in submitting form", error);
      alert("error in submitting form. please try again !");
    }
  };

  return (
    <>
      {loading && <Loader />}
      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          <main className="py-15 min-h-screen bg-[#dddddd]">
            <div className="bg-[#F5C469] text-center pt-8 pb-8 pr-10 pl-10 rounded-2xl mx-140">
              <h3 className="capitalize font-bold md:text-3xl text-2xl mb-5 text-[#333333]">
                sign up
              </h3>

              <form className="text-center" onSubmit={handleSubmit}>
                <input
                  name="customer_name"
                  type="text"
                  placeholder="enter your name"
                  onChange={handleChange}
                  value={formData.customer_name}
                  className="border bg-[#dddddd] border-[#333333] w-70 h-13 md:w-80 md:h-12 mb-6 rounded-xl pl-3"
                />

                <input
                  name="email"
                  type="email"
                  placeholder="enter your email"
                  onChange={handleChange}
                  value={formData.email}
                  className="border bg-[#dddddd] border-[#333333] w-70 h-13 md:w-80 md:h-12 mb-6 rounded-xl pl-3"
                />

                <input
                  name="phone_number"
                  type="text"
                  placeholder="enter your phone number"
                  onChange={handleChange}
                  value={formData.phone_number}
                  className="border bg-[#dddddd] border-[#333333] w-70 h-13 md:w-80 md:h-12 mb-6 rounded-xl pl-3"
                />

                <div className="relative mb-6">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="enter your password"
                    onChange={handleChange}
                    value={formData.password}
                    className="border bg-[#dddddd] border-[#333333] w-70 h-13 md:w-80 md:h-12 rounded-xl pl-3 pr-12"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-700"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>

                <div className="relative mb-10">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="confirm your password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    value={confirmPassword}
                    className="border bg-[#dddddd] border-[#333333] w-70 h-13 md:w-80 md:h-12 rounded-xl pl-3 pr-12"
                  />

                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-700"
                  >
                    {showConfirmPassword ? "Hide" : "Show"}
                  </button>
                </div>

                <button className="bg-[#333333] text-[#F5C469] font-semibold border pt-2 pb-2 md:px-33 px-28 rounded-xl md:text-[17px] text-[17px]">
                  submit
                </button>

                <div className="flex justify-center items-center gap-2 capitalize mt-5 text-[15px]">
                  <p className="text-[#333333]">already have an account ?</p>
                  <button
                    type="button"
                    className="capitalize text-blue-500"
                    onClick={showLoader}
                  >
                    signin
                  </button>
                </div>
              </form>
            </div>
          </main>
        </motion.div>
      )}
    </>
  );
};

export default Signup;
