import React, { useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import { motion } from "framer-motion";

const About = () => {
  const [loading, setLoading] = useState(false);

  return (
    <>
      {" "}
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
            <div className="text-center py-35 bg-[#dddddd]">
              <h1 className="md:text-3xl text-2xl font-bold text-[#333333]  mb-6 text-center capitalize">
                About SHG bazaar
              </h1>
              <div className="text-[#333333] flex justify-center items-center">
                <div>
                  <p className="flex-wrap text-[16px] md:text-lg mx-3 md:mx-0 md:max-w-3xl text-center leading-relaxed ">
                    SHG Bazaar is a smart digital marketplace built to support
                    and promote the Self Help Groups (SHGs) of Goa. It provides
                    a simple way for local women entrepreneurs and community
                    groups to showcase, sell, and manage their handmade or
                    homegrown products online.
                  </p>
                  <p className="flex-wrap text-[16px] md:text-lg mx-3 md:mx-0  md:max-w-3xl text-center leading-relaxed mt-4 ">
                    From Goan spices, traditional crafts, and homemade pickles
                    to eco-friendly products and textiles — SHG Bazaar connects
                    these talented producers directly with buyers, removing
                    middlemen and ensuring fair earnings.
                  </p>
                  <p className="flex-wrap text-[16px] md:text-lg mx-3 md:mx-0  md:max-w-3xl text-center leading-relaxed mt-4">
                    The platform also helps SHGs track sales, and gain insights
                    to grow their businesses. By blending local craftsmanship
                    with modern technology, SHG Bazaar aims to make Goa’s rural
                    and community entrepreneurship stronger, more visible, and
                    self-reliant — empowering women and preserving Goa’s rich
                    cultural heritage, one product at a time.
                  </p>
                </div>
              </div>
            </div>
            <Footer setLoading={setLoading} />
          </motion.div>
        </>
      )}
    </>
  );
};
export default About;
