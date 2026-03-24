import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
const ShgLogin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  
  const showLoader = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(true);
      navigate("/registrationform");
    }, 1500);
  };
  const showLoader2 = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(true);
      navigate("/forgotpassword");
    }, 1500);
  };
  const showLoader3 = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(true);
      navigate("/signin");
    }, 1500);
  };
  const [FormData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setFormData({ ...FormData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (FormData["email"] == "" || FormData["password"] == "") {
      if (FormData["email"] == "") {
        alert("please enter your email !");
      } else if (FormData["password"] == "") {
        alert("please enter your password !");
      } else if (FormData["password"].length < 8) {
        alert("passsword size should be minimum 8 characters !");
      }
    } else {
      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/shgloginform/shg_login/",
          FormData,
        );
        localStorage.setItem("access_token", response.data.access);
        localStorage.setItem("refresh_token", response.data.refresh);

        setFormData({
          email: "",
          password: "",
        });
        alert("login successful.");
        navigate("/adminpanel");
      } catch (error) {
        console.error("error in submitting form", error);
        alert("error in submitting form.please try again !");
      }
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
          <main className="py-35  min-h-screen bg-[#dddddd]">
            <div className=" bg-[#F5C469] text-center  pt-8 pb-8  md:pt-8 md:pb-8 pr-10 pl-10 rounded-2xl  mx-140">
              <h3 className="capitalize font-bold md:text-3xl text-2xl mb-5 text-[#333333]">
                shg login
              </h3>
              <form action="#" className="text-center" onSubmit={handleSubmit}>
                <div>
                  <div className="text-left mb-2">
                    <label
                      htmlFor="email"
                      className="capitalize text-[#333333]  md:text-[15px] text-[14px]"
                    >
                      email*
                    </label>
                  </div>
                  <input
                    name="email"
                    className="border bg-[#dddddd]  border-[#333333]  w-70 h-13 md:w-80 md:h-12 mb-6 rounded-xl pl-3 placeholder:capitalize placeholder:text-[14px] placeholder:text-[#585858]"
                    type="email"
                    placeholder="enter your email"
                    onChange={handleChange}
                    value={FormData.email}
                  />
                </div>
                <div className="relative mb-6">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="enter your password"
                    onChange={handleChange}
                    value={FormData.password}
                    className="border bg-[#dddddd] border-[#333333] w-70 h-13 md:w-80 md:h-12 rounded-xl pl-3 pr-12 placeholder:capitalize placeholder:text-[14px] placeholder:text-[#585858]"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-700"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
                <div>
                  <button className="hover:bg-[#dddddd] hover:border-[#333333] hover:border  hover:rounded-lg  hover:text-[#333333] bg-accent bg-[#333333] text-[#F5C469] font-semibold capitalize border pt-2 pb-2 md:px-33 px-28 rounded-xl md:text-[17px] text-[17px]">
                    submit
                  </button>
                </div>
                <div className="flex justify-center items-center gap-2 capitalize mt-5 text-[15px]">
                  <div className="text-[#333333]">
                    <p>don't have an account ?</p>
                  </div>
                  <div>
                    <button
                      type="button"
                      className="capitalize text-blue-500"
                      onClick={showLoader}
                    >
                      registration form
                    </button>
                  </div>
                </div>
                <div className="flex justify-center items-center gap-2 capitalize mt-3 text-[15px]">
                  <div className="text-[#333333]">
                    <p>Sign in as User?</p>
                  </div>
                  <div>
                    <button
                      type="button"
                      className="capitalize text-blue-500"
                      onClick={showLoader3}
                    >
                      signin
                    </button>
                  </div>
                </div>
                <div className="flex justify-center items-center gap-2 capitalize mt-3 text-[15px]">
                  <div className="text-[#333333]">
                    <p>forgot password?</p>
                  </div>
                  <div>
                    <button
                      type="button"
                      className="capitalize text-blue-500"
                      onClick={showLoader2}
                    >
                      reset password
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </main>
        </motion.div>
      )}
    </>
  );
};
export default ShgLogin;
