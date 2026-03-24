import React, { useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Loader from "../components/Loader";
import { motion } from "framer-motion";

import {
  faEnvelope,
  faPhone,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
const Contact = () => {
  const [loading, setLoading] = useState(false);

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <Loader />
        </div>
      ) : (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 3 }}
          >
            <NavBar></NavBar>
            <main className="text-center py-35 bg-[#dddddd]">
              <div className=" text-center flex flex-col   md:flex-row justify-center items-center md:gap-50 gap-10  px-6">
                <div className="text-center md:text-left text-[#333333] max-w-md">
                  <h1 className="md:text-3xl text-2xl font-bold mb-5">
                    Get in Touch
                  </h1>
                  <p className="text-[16px] md:text-lg leading-relaxed mb-8">
                    Have questions, feedback, or partnership ideas? We’d love to
                    hear from you! Fill out the form or reach us directly
                    through the details below.
                  </p>

                  <div className="space-y-3 text-[16px] md:text-[18px]">
                    <div className="flex items-center space-x-3">
                      <FontAwesomeIcon
                        icon={faEnvelope}
                        className="text-[#333333] md:text-xl"
                      />
                      <span>support@sngbazaar.com</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <FontAwesomeIcon
                        icon={faPhone}
                        className="text-[#333333] md:text-xl"
                      />
                      <span>+91 98765 43210</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <FontAwesomeIcon
                        icon={faLocationDot}
                        className="text-[#333333] md:text-xl"
                      />
                      <span>Goa, India</span>
                    </div>
                  </div>
                </div>
                <div className="bg-[#F5C469] pt-10 pb-8 md:pt-12 md:pb-10 pr-8 pl-8 rounded-2xl max-w-md border-[#333333] border">
                  <form action="#" className="text-center">
                    <div>
                      <div className="text-left mb-2">
                        <label
                          htmlFor="name"
                          className="capitalize text-[#333333] md:text-[15px] text-[14px]"
                        >
                          your name*
                        </label>
                      </div>
                      <input
                        className="border bg-[#dddddd]  border-[#333333] w-70 h-13 md:w-80 md:h-12 mb-6 rounded-xl pl-3 placeholder:capitalize placeholder:text-[14px] placeholder:text-[#585858]"
                        type="text"
                        placeholder="enter your name"
                      />
                    </div>
                    <div>
                      <div className="text-left mb-2">
                        <label
                          htmlFor="email"
                          className="capitalize text-[#333333] md:text-[15px] text-[14px]"
                        >
                          your email*
                        </label>
                      </div>
                      <input
                        className="border bg-[#dddddd]  border-[#333333] w-70 h-13 md:w-80 md:h-12 mb-6 rounded-xl pl-3 placeholder:capitalize placeholder:text-[14px] placeholder:text-[#585858]"
                        type="email"
                        placeholder="enter your email"
                      />
                    </div>
                    <div>
                      <div className="text-left mb-2">
                        <label
                          htmlFor="message"
                          className="capitalize text-[#333333] md:text-[15px] text-[14px]"
                        >
                          your message*
                        </label>
                      </div>
                      <textarea
                        className="mb-10 w-70 h-30 md:w-80 md:h-35 p-3 border bg-[#dddddd]  border-[#333333] rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none placeholder:capitalize placeholder:text-[14px] placeholder:text-[#585858]"
                        placeholder="enter your message"
                      ></textarea>
                    </div>
                    <div>
                      <button className="hover:bg-[#dddddd] hover:border-[#333333] hover:border  hover:rounded-lg  hover:text-[#333333] bg-accent bg-[#333333] text-[#F5C469]  font-semibold capitalize border pt-2 pb-2 md:px-30 px-28 rounded-xl md:text-[17px] text-[17px]">
                        submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </main>
            <Footer setLoading={setLoading} />
          </motion.div>
        </>
      )}
    </>
  );
};
export default Contact;
