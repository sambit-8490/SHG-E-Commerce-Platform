import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
  });

  const showLoader = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/signin");
    }, 1500);
  };

  const showLoader1 = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/shglogin");
    }, 1500);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData["email"] == "") {
      alert("please enter your email id.");
    } else {
      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/forgot_password/",
          formData,
        );
        alert("reset link generated.");
        setFormData({
          email: "",
        });
      } catch {
        console.error("error in submitting form");
      }
    }
  };
  return (
    <>
      {loading && <Loader />}
      {!loading && (
        <div className=" bg-[#dddddd] min-h-screen flex items-center justify-center px-4">
          <div className="relative w-full max-w-md bg-white rounded-xl p-8 shadow-sm border border-gray-200">
            <div className="flex flex-col items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-600">
                Forgot Password
              </h2>
              <p className="text-sm text-gray-500 mt-1 text-center">
                Enter your email to receive reset instructions
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="text-sm font-medium text-gray-600">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  value={formData.email}
                  placeholder="Enter your email"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-[#F5C469] focus:ring-1 focus:ring-[#F5C469] placeholder:text-gray-400"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 px-4 bg-[#F5C469] text-white font-semibold rounded-lg hover:bg-[#ffb429] transition flex justify-center items-center"
              >
                <span>Send Reset Link</span>
              </button>
            </form>
            <div className="flex justify-center items-center gap-x-1.5">
              <p
                onClick={showLoader}
                className="text-center text-sm text-gray-600 mt-6"
              >
                Remembered your password?{" "}
                <a className="text-[#F5C469] font-semibold hover:underline">
                  Sign in
                </a>
              </p>
              <p
                onClick={showLoader1}
                className="text-center text-sm text-gray-600 mt-6"
              >
                or{" "}
                <a className="text-[#F5C469] font-semibold hover:underline">
                  Shg login
                </a>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ForgotPassword;
