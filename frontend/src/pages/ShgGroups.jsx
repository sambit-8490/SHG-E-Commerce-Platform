import React, { useState, useEffect } from "react";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import GroupCard from "../components/GroupCard";
import ContainerLoader from "../components/ContainerLoader";
import Loader from "../components/Loader";
import { motion } from "framer-motion";
import axios from "axios";

const ShgGroups = () => {
  const [Groups, setGroups] = useState([]);
  const [loader, showLoader] = useState(true);
  const [loading, setLoading] = useState(false);

  setTimeout(() => {
    showLoader(false);
  }, 3500);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/shg_groups/");
        setGroups(response.data["shg_grp_list"]);
      } catch {
        console.error("groups not available...");
      }
    };
    fetchData();
  }, [setGroups]);
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
            <Navbar></Navbar>
            <section className="bg-[#f0f0f0] min-h-screen py-34">
              {!loader && Groups.length != 0 && (
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-[#333333]">
                    SHG Groups
                  </h2>
                  <p className="mt-3 text-gray-600 md:text-lg max-w-2xl mx-auto">
                    Discover Self Help Groups creating amazing products across
                    Goa
                  </p>
                </div>
              )}

              {loader && (
                <div className="flex justify-center items-center h-40">
                  <ContainerLoader />
                </div>
              )}
              {!loader && Groups.length == 0 && (
                <motion.div
                  className="px-4 md:px-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1.5 }}
                >
                  <div className="text-center mb-12">
                    <p className="capitalize text-3xl md:text-4xl font-bold text-[#333333]">
                      no shg groups found....
                    </p>
                  </div>
                </motion.div>
              )}

              {!loader && Groups.length != 0 && (
                <motion.div
                  className="px-4 md:px-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1.5 }}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {Groups.map((item, index) => (
                      <GroupCard
                        key={index}
                        GroupImage={item["image"]}
                        NameOfShg={item["name_of_shg"]}
                        DateOfFormation={item["date_of_formation"]}
                        RegistrationNumber={item["registration_number"]}
                        ContactNumber={item["contact_number"]}
                        Village={item["village"]}
                        Taluka={item["taluka"]}
                        District={item["district"]}
                        TypeOfShg={item["type_of_shg"]}
                        Address={item["address"]}
                        className="hover:scale-105 transition-transform duration-300"
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </section>

            <Footer setLoading={setLoading} />
          </motion.div>
        </>
      )}
    </>
  );
};
export default ShgGroups;
