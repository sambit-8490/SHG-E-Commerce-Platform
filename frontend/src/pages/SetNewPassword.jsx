import React, { useState } from "react";
import axios from "axios";
const SetNewPassword = () => {
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newPasssword, setNewPasssword] = useState("");
  const params = new URLSearchParams(window.location.search);
  const uid = params.get("uid");
  const token = params.get("token");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!newPasssword || !confirmPassword){
      alert("please enter the password ");
    }
    else{
      if (newPasssword!= confirmPassword) {
      alert("password reset successfully");
    } else {
      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/reset_password/",
          {
           uid,
            token,
            newpassword:newPasssword
          }
        );
        setNewPasssword("")
        setConfirmPassword("")
        alert("password reset successfully.");
      } catch {
        console.error("reset link expired.");
      }
    }
    }
    
  };
  return (
    <>
      <div className="bg-  min-h-screen flex items-center justify-center px-4">
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
              <label className="text-sm capitalize font-medium text-gray-600">
                new password
              </label>
              <input
                type="text"
                name="new_passsword"
                onChange={(e)=>setNewPasssword(e.target.value)}
                value={newPasssword}
                placeholder="Enter your password"
                className="mt-1 block w-full px-3 py-2 border border-gray-300  rounded-lg focus:border-[#F5C469] focus:ring-1 focus:ring-[#F5C469] placeholder:text-gray-400"
              />
            </div>
            <div>
              <label className="text-sm capitalize font-medium text-gray-600">
                confirm password
              </label>
              <input
                type="password"
                name="confirm_password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
                placeholder="confirm the password"
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
        </div>
      </div>
    </>
  );
};
export default SetNewPassword;
