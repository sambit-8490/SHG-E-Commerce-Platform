import React, { useState } from "react";
import Loader from "../components/Loader";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(null);
  const [groupImage, setGroupImage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const showLoader = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/shglogin");
    }, 1500);
  };
  const [formData, setFormData] = useState({
    name_of_shg: "",
    date_of_formation: "",
    registration_number: "",
    contact_number: "",
    village: "",
    taluka: "",
    district: "",
    type_of_shg: "",
    email: "",
    password: "",
    address: "",
  });
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setGroupImage(files[0]);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      formData["name_of_shg"] == "" ||
      formData["date_of_formation"] == "" ||
      formData["registration_number"] == "" ||
      formData["contact_number"] == "" ||
      formData["village"] == "" ||
      formData["taluka"] == "" ||
      formData["district"] == "" ||
      formData["type_of_shg"] == "" ||
      formData["email"] == "" ||
      formData["password"] == "" ||
      formData["address"] == ""
    ) {
      if (formData["name_of_shg"] == "") {
        alert("please enter group name !");
      }
      if (formData["date_of_formation"] == "") {
        alert("please enter group registration date !");
      }
      if (formData["registration_number"] == "") {
        alert("please enter group registration number !");
      }
      if (formData["contact_number"] == "") {
        alert("please enter group contact number !");
      }
      if (formData["contact_number"].length < 10) {
        alert("contact number length cannot be less than 10 !");
      }
      if (formData["village"] == "") {
        alert("please enter village!");
      }
      if (formData["taluka"] == "") {
        alert("please enter taluka !");
      }
      if (formData["district"] == "") {
        alert("please enter district !");
      }
      if (formData["type_of_shg"] == "") {
        alert("please enter type_of_shg !");
      }
      if (formData["email"] == "") {
        alert("please enter email !");
      }
      if (formData["password"] == "") {
        alert("please enter password !");
      }
      if (formData["address"] == "") {
        alert("please enter Address !");
      }
    } else {
      try {
        const formDataToSend = new FormData();

        Object.entries(formData).forEach(([key, value]) => {
          formDataToSend.append(key, value);
        });

        formDataToSend.append("image", groupImage);

        await axios.post(
          "http://127.0.0.1:8000/groupform/submit_registration_form/",
          formDataToSend,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
        );

        alert("form submitted !");
        setFormData({
          name_of_shg: "",
          date_of_formation: "",
          registration_number: "",
          contact_number: "",
          village: "",
          taluka: "",
          district: "",
          type_of_shg: "",
          email: "",
          password: "",
          address: "",
        });

        setGroupImage(null);
        navigate("/shglogin");
      } catch (error) {
        console.error("error in submitting form !", error);
        alert("error in submitting form.please try again !");
      }
    }
  };
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
            <div className=" bg-[#dddddd]">
              <div className="text-center pt-35">
                <h1 className="font-bold md:text-3xl text-2xl">
                  SHG Registration Form
                </h1>
              </div>
              <div className="pt-10 pb-30 flex justify-center items-center bg-[#dddddd]">
                <div className="bg-[#F5C469] pt-10 pb-8 md:pt-12 md:pb-10 pr-8 pl-8  rounded-2xl border border-[#333333] shadow-2xl">
                  <form className="text-center" onSubmit={handleSubmit}>
                    <div className="flex flex-col md:flex-row justify-center items-center md:gap-8">
                      <div>
                        <div className="text-left mb-2">
                          <label
                            htmlFor="name"
                            className="capitalize text-[#333333] md:text-[15px] text-[14px]"
                          >
                            Name of SHG*
                          </label>
                        </div>
                        <input
                          name="name_of_shg"
                          className="border bg-[#dddddd] border-[#333333] w-70 h-13 md:w-80 md:h-12 mb-6 rounded-xl pl-3 placeholder:capitalize placeholder:text-[14px] placeholder:text-[#585858]"
                          type="text"
                          placeholder="eg., Mahalaxmi Mahila SHG"
                          onChange={handleChange}
                          value={formData.name_of_shg}
                        />
                      </div>

                      <div>
                        <div className="text-left mb-2">
                          <label
                            htmlFor="name"
                            className="capitalize text-[#333333] md:text-[15px] text-[14px]"
                          >
                            Date of Formation*
                          </label>
                        </div>
                        <input
                          name="date_of_formation"
                          className="border bg-[#dddddd] border-[#333333] w-70 h-13 md:w-80 md:h-12 mb-6 rounded-xl pl-3 placeholder:capitalize placeholder:text-[14px] text-[#585858]"
                          type="date"
                          onChange={handleChange}
                          value={formData.date_of_formation}
                        />
                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row justify-center items-center md:gap-8">
                      <div>
                        <div className="text-left mb-2">
                          <label
                            htmlFor="name"
                            className="capitalize text-[#333333] md:text-[15px] text-[14px]"
                          >
                            Registration Number*
                          </label>
                        </div>
                        <input
                          name="registration_number"
                          className="border bg-[#dddddd] border-[#333333] w-70 h-13 md:w-80 md:h-12 mb-6 rounded-xl pl-3 placeholder:capitalize placeholder:text-[14px] placeholder:text-[#585858]"
                          type="text"
                          placeholder="eg., SHG-GOA-2025-017"
                          onChange={handleChange}
                          value={formData.registration_number}
                        />
                      </div>
                      <div>
                        <div className="text-left mb-2">
                          <label
                            htmlFor="text"
                            className="capitalize text-[#333333] md:text-[15px] text-[14px]"
                          >
                            Contact Number*
                          </label>
                        </div>
                        <input
                          name="contact_number"
                          className="border bg-[#dddddd] border-[#333333] w-70 h-13 md:w-80 md:h-12 mb-6 rounded-xl pl-3 placeholder:capitalize placeholder:text-[14px] placeholder:text-[#585858]"
                          type="text"
                          placeholder="eg., 9146228061"
                          onChange={handleChange}
                          value={formData.contact_number}
                        />
                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row justify-center items-center md:gap-8">
                      <div>
                        <div className="text-left mb-2">
                          <label
                            htmlFor="text"
                            className="capitalize text-[#333333] md:text-[15px] text-[14px]"
                          >
                            Village / Locality*
                          </label>
                        </div>
                        <input
                          name="village"
                          className="border bg-[#dddddd] border-[#333333] w-70 h-13 md:w-80 md:h-12 mb-6 rounded-xl pl-3 placeholder:capitalize placeholder:text-[14px] placeholder:text-[#585858]"
                          type="text"
                          placeholder="eg., Keri,Panchawadi"
                          onChange={handleChange}
                          value={formData.village}
                        />
                      </div>
                      <div>
                        <div className="text-left mb-2">
                          <label
                            htmlFor="text"
                            className="capitalize text-[#333333] md:text-[15px] text-[14px]"
                          >
                            Taluka*
                          </label>
                        </div>
                        <input
                          name="taluka"
                          className="border bg-[#dddddd] border-[#333333] w-70 h-13 md:w-80 md:h-12 mb-6 rounded-xl pl-3 placeholder:capitalize placeholder:text-[14px] placeholder:text-[#585858]"
                          type="text"
                          placeholder="eg., Sattari"
                          onChange={handleChange}
                          value={formData.taluka}
                        />
                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row justify-center items-center md:gap-8">
                      <div>
                        <div className="text-left mb-2">
                          <label
                            htmlFor="text"
                            className="capitalize text-[#333333] md:text-[15px] text-[14px]"
                          >
                            District*
                          </label>
                        </div>
                        <select
                          className="border bg-[#dddddd] border-[#333333] w-70 h-13 md:w-80 md:h-12 mb-6 rounded-xl pl-3 placeholder:capitalize placeholder:text-[14px] text-[#585858]"
                          name="district"
                          id=""
                          onChange={handleChange}
                          value={formData.district}
                        >
                          {" "}
                          <option value="" disabled>
                            Select District
                          </option>
                          <option value="North Goa">North Goa</option>
                          <option value="South Goa">South Goa</option>
                        </select>
                      </div>
                      <div>
                        <div className="text-left mb-2">
                          <label
                            htmlFor="text"
                            className="capitalize text-[#333333] md:text-[15px] text-[14px]"
                          >
                            Type of SHG*
                          </label>
                        </div>
                        <select
                          className="border bg-[#dddddd] border-[#333333] w-70 h-13 md:w-80 md:h-12 mb-6 rounded-xl pl-3 placeholder:capitalize placeholder:text-[14px] text-[#585858]"
                          name="type_of_shg"
                          id=""
                          onChange={handleChange}
                          value={formData.type_of_shg}
                        >
                          <option value="" disabled>
                            Select Type
                          </option>
                          <option value="Women">Women</option>
                          <option value="Men">Men</option>
                          <option value="Mixed">Mixed</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row justify-center items-center md:gap-8 md:mb-6">
                      <div>
                        <div className="text-left mb-2">
                          <label className="capitalize text-[#333333] md:text-[15px] text-[14px]">
                            email*
                          </label>
                        </div>
                        <input
                          name="email"
                          className="border bg-[#dddddd] border-[#333333] w-70 h-13 md:w-80 md:h-12  rounded-xl pl-3  placeholder:text-[14px] placeholder:text-[#585858]"
                          type="email"
                          placeholder="eg., shaktienterprises@gmail.com"
                          onChange={handleChange}
                          value={formData.email}
                        />
                      </div>

                      <div>
                        <div className="text-left mb-2">
                          <label className="capitalize text-[#333333] md:text-[15px] text-[14px]">
                            password*
                          </label>
                        </div>

                        <div className="relative">
                          <input
                            name="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="enter your password"
                            onChange={handleChange}
                            value={formData.password}
                            className="border bg-[#dddddd] border-[#333333] w-70 h-13 md:w-80 md:h-12  rounded-xl pl-3 pr-12 placeholder:capitalize placeholder:text-[14px] placeholder:text-[#585858]"
                          />

                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-0 h-full flex items-center text-sm text-gray-700"
                          >
                            {showPassword ? "Hide" : "Show"}
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row justify-center items-center">
                      <div>
                        <div className="text-left mb-2">
                          <label
                            htmlFor="message"
                            className="capitalize text-[#333333] md:text-[15px] text-[14px]"
                          >
                            Address of SHG Office*
                          </label>
                        </div>
                        <textarea
                          className="mb-2 w-70 h-30 md:w-2xl md:h-35 p-3 border bg-[#dddddd]  border-[#333333] rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none placeholder:capitalize placeholder:text-[14px] placeholder:text-[#585858]"
                          placeholder="eg., House No. 56, Near Primary School, Keri, Valpoi – 403505"
                          onChange={handleChange}
                          value={formData.address}
                          name="address"
                        ></textarea>
                      </div>
                    </div>
                    <div>
                      <div className="text-left mb-2">
                        <label className="capitalize text-[#333333] md:text-[15px] text-[14px]">
                          Group Picture*
                        </label>
                        <div className="mt-2">
                          <input
                            type="file"
                            name="image"
                            accept="image/*"
                            onChange={handleChange}
                            className="border bg-[#dddddd] border-[#333333] w-70 md:w-full mb-6 rounded-xl p-2 text-[14px]"
                          />
                          {groupImage && (
                            <img
                              src={URL.createObjectURL(groupImage)}
                              alt="Preview"
                              className="w-32 h-32 object-cover rounded-lg mb-6 border border-[#333333]"
                            />
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row justify-center items-center">
                      <button className="hover:bg-[#dddddd] hover:border-[#333333] hover:border  hover:rounded-lg  hover:text-[#333333] bg-accent bg-[#333333] text-[#F5C469] font-semibold capitalize border pt-2 pb-2 md:px-77 px-28 rounded-xl md:text-[17px] text-[17px]">
                        submit
                      </button>
                    </div>
                  </form>
                  <div className="flex justify-center  items-center  gap-2 capitalize mt-5  text-[15px]">
                    <div className="text-[#333333]">
                      <p>already have an account ?</p>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="capitalize text-blue-500"
                        onClick={showLoader}
                      >
                        shg login
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </>
  );
};
export default RegistrationForm;
