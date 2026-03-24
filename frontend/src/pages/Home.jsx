import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import Navbar from "../components/NavBar";
import MainSection from "../components/MainSection";
import ShopCategoryCard from "../components/ShopCategoryCard";
import ProductCard from "../components/ProductCard";
import GroupCard from "../components/GroupCard";
import ImpactCard from "../components/ImpactCard";
import ProcessCard from "../components/ProcessCard";
import Footer from "../components/Footer";
import BottomButtonSection from "../components/BottomButtonSection";
import SigninPopup from "../components/SigninPopup";
import SignupPopup from "../components/SignupPopup";
import coconutimage from "../assets/Beauty_Oils_Round_Bottle.webp";
import honeyimage from "../assets/shopping.webp";
import soapimage from "../assets/soap.webp";
import handbgimage from "../assets/handbag.avif";
import shgimg1 from "../assets/shg1.jpg";
import shgimg2 from "../assets/shg2.jpg";
import shgimg3 from "../assets/shg3.jpg";
import shgimg4 from "../assets/shg4.jpg";

import {
  faUtensils,
  faPalette,
  faShirt,
  faLeaf,
  faHouse,
  faGift,
  faUser,
  faBox,
  faHeart,
  faRupeeSign,
} from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [shgGroups, setShgGroups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchLoader, setFetchLoader] = useState(true);
  const navigate = useNavigate();
  const [showSigninPopup, setShowSigninPopup] = useState(false);
  const [showSignupPopup, setShowSignupPopup] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setFetchLoader(false), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productResponse = await axios.get(
          "http://127.0.0.1:8000/get_products/",
        );
        setProducts(productResponse.data["products_list"] || []);

        const groupResponse = await axios.get(
          "http://127.0.0.1:8000/shg_groups/",
        );
        setShgGroups(groupResponse.data["shg_grp_list"] || []);
      } catch (err) {
        console.error("Error fetching dynamic data:", err);
      }
    };
    fetchData();
  }, []);

  const handleAuthSuccess = () => {
    setShowSigninPopup(false);
    setShowSignupPopup(false);
    window.location.reload();
  };

  return (
    <>
      {showSigninPopup && (
        <SigninPopup
          onClose={() => setShowSigninPopup(false)}
          onSuccess={handleAuthSuccess}
          openSignup={() => {
            setShowSigninPopup(false);
            setShowSignupPopup(true);
          }}
        />
      )}

      {showSignupPopup && (
        <SignupPopup
          onClose={() => setShowSignupPopup(false)}
          onSuccess={handleAuthSuccess}
          openSignin={() => {
            setShowSignupPopup(false);
            setShowSigninPopup(true);
          }}
        />
      )}

      <>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 3 }}
        >
          <Navbar />
          <MainSection setLoading={setLoading} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 4 }}
        >
          <section className="text-center py-14 bg-[#dddddd]">
            <div>
              <h2 className="font-bold text-[#333333] font-sans text-2xl md:text-3xl">
                Shop by Category
              </h2>
              <p className="text-[#333333] md:text-[17px] mt-4">
                Explore authentic Goan products crafted with love by local Self
                Help Groups
              </p>
            </div>
            <div className="flex flex-col md:flex-row gap-5 justify-center items-center md:gap-12 text-center pt-10">
              <ShopCategoryCard
                Logo={faUtensils}
                CategoryType={"Food & Beverages"}
              />
              <ShopCategoryCard Logo={faPalette} CategoryType={"Handicrafts"} />
              <ShopCategoryCard Logo={faShirt} CategoryType={"Textiless"} />
              <ShopCategoryCard Logo={faLeaf} CategoryType={"Wellness"} />
              <ShopCategoryCard Logo={faHouse} CategoryType={"Home Decor"} />
              <ShopCategoryCard Logo={faGift} CategoryType={"Gifts"} />
            </div>
          </section>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 3 }}
        >
          <section className="py-14 bg-[#333333]">
            <div className="text-center">
              <h2 className="font-bold text-[#F5C469] font-sans text-2xl md:text-3xl">
                Featured Products
              </h2>
              <p className="text-[#dddddd] md:text-[17px] mt-2">
                Handpicked favorites from our local artisans
              </p>
            </div>

            <div className="flex flex-col md:flex-row justify-center items-center gap-5 md:gap-10 text-center pt-10 px-4">
              {products.length > 0 ? (
                products
                  .slice(0, 4)
                  .map((item) => (
                    <ProductCard
                      key={item.id}
                      productId={item.id}
                      image={item.image}
                      ProductName={item.product_name}
                      Amount={item.price}
                      Quantity={item.stock_quantity}
                      Description={item.description}
                      Category={item.category}
                      onRequireLogin={() => setShowSigninPopup(true)}
                    />
                  ))
              ) : (
                <>
                  <ProductCard
                    image1={coconutimage}
                    ProductName={"Premium Coconut Oil"}
                    Amount={"350"}
                    Quantity={500}
                    Description={
                      "Cold-pressed coconut oil made by local women's SHG."
                    }
                    Category={"Edible Oil"}
                    onRequireLogin={() => setShowSigninPopup(true)}
                  />
                  <ProductCard
                    image1={honeyimage}
                    ProductName={"Organic Honey"}
                    Amount={"450"}
                    Quantity={200}
                    Description={
                      "Pure organic honey harvested by the Sunshine Women's SHG."
                    }
                    Category={"Honey & Syrups"}
                    onRequireLogin={() => setShowSigninPopup(true)}
                  />
                  <ProductCard
                    image1={soapimage}
                    ProductName={"Lavender Handmade Soap"}
                    Amount={"150"}
                    Quantity={300}
                    Description={
                      "Natural handmade soap with soothing lavender fragrance."
                    }
                    Category={"Personal Care"}
                    onRequireLogin={() => setShowSigninPopup(true)}
                  />
                  <ProductCard
                    image1={handbgimage}
                    ProductName={"Handwoven Cotton Bag"}
                    Amount={"600"}
                    Quantity={150}
                    Description={
                      "Eco-friendly handwoven cotton bag by Mountain Weavers SHG."
                    }
                    Category={"Textiles & Handicrafts"}
                    onRequireLogin={() => setShowSigninPopup(true)}
                  />
                </>
              )}
            </div>
          </section>

          <section className="text-center py-14 bg-[#dddddd]">
            <div>
              <h2 className="font-bold text-[#333333] font-sans text-2xl md:text-3xl">
                Featured SHG Groups
              </h2>
              <p className="text-[#333333] md:text-[17px] mt-4">
                Meet the amazing Self Help Groups creating beautiful products
                across Goa
              </p>
            </div>

            <div className="grid grid-col-1 md:grid-cols-4 items-stretch md:mx-20 md:gap-x-3 text-center pt-10">
              {shgGroups.length > 0 ? (
                shgGroups
                  .slice(0, 4)
                  .map((item, index) => (
                    <GroupCard
                      key={index}
                      GroupImage={item.image}
                      NameOfShg={item.name_of_shg}
                      DateOfFormation={item.date_of_formation}
                      RegistrationNumber={item.registration_number}
                      ContactNumber={item.contact_number}
                      Village={item.village}
                      Taluka={item.taluka}
                      District={item.district}
                      TypeOfShg={item.type_of_shg}
                      Address={item.address}
                    />
                  ))
              ) : (
                <>
                  <GroupCard
                    GroupImage1={shgimg1}
                    NameOfShg={"Mountain Weavers"}
                    DateOfFormation={"05-06-2019"}
                    RegistrationNumber={"SHG13579XYZ"}
                    ContactNumber={"+91 97654 32109"}
                    Village={"Chorla"}
                    Taluka={"Sattari"}
                    District={"North Goa"}
                    TypeOfShg={"Textiles & Handloom"}
                    Address={
                      "Plot No. 7, Hillview Street, Chorla, Sattari, North Goa"
                    }
                  />
                  <GroupCard
                    GroupImage1={shgimg2}
                    NameOfShg={"Seaside Artisans"}
                    DateOfFormation={"22-11-2016"}
                    RegistrationNumber={"SHG24680LMN"}
                    ContactNumber={"+91 99887 66554"}
                    Village={"Calangute"}
                    Taluka={"Bardez"}
                    District={"North Goa"}
                    TypeOfShg={"Handicrafts & Art"}
                    Address={
                      "Shop 5, Beach Road, Calangute Village, Bardez, North Goa"
                    }
                  />
                  <GroupCard
                    GroupImage1={shgimg3}
                    NameOfShg={"Greenfields Farmers"}
                    DateOfFormation={"10-03-2018"}
                    RegistrationNumber={"SHG67890ABC"}
                    ContactNumber={"+91 91234 56789"}
                    Village={"Ponda"}
                    Taluka={"Ponda Taluka"}
                    District={"North Goa"}
                    TypeOfShg={"Agriculture & Farming"}
                    Address={"House No. 12, Market Road, Ponda, North Goa, Goa"}
                  />
                  <GroupCard
                    GroupImage1={shgimg4}
                    NameOfShg={"Sunshine Women's"}
                    DateOfFormation={"15-08-2015"}
                    RegistrationNumber={"SHG12345XYZ"}
                    ContactNumber={"+91 98765 43210"}
                    Village={"Kudal"}
                    Taluka={"Kudal Taluka"}
                    District={"Sindhudurg"}
                    TypeOfShg={"Women Empowerment"}
                    Address={
                      "Plot No. 24, Main Street, Kudal Village, Sindhudurg, Maharashtra"
                    }
                  />
                </>
              )}
            </div>
          </section>

          <section className="text-center py-14 bg-[#333333]">
            <div>
              <h2 className="font-bold text-[#F5C469] font-sans text-2xl md:text-3xl">
                Our Impact
              </h2>
              <p className="text-[#dddddd] md:text-[17px] mt-4">
                Supporting local communities and preserving traditional crafts
                across Goa
              </p>
            </div>
            <div className="flex flex-col md:flex-row justify-center items-center gap-5 md:gap-10 text-center pt-10">
              <ImpactCard
                TotalNumber={"150"}
                CardText={"SHG Groups"}
                Logo={faUser}
              />
              <ImpactCard
                TotalNumber={"2500"}
                CardText={"Products"}
                Logo={faBox}
              />
              <ImpactCard
                TotalNumber={"10,000"}
                CardText={"Happy Customers"}
                Logo={faHeart}
              />
              <ImpactCard
                TotalNumber={"50L"}
                CardText={"Revenue Generated"}
                Logo={faRupeeSign}
              />
            </div>
          </section>

          <section className="text-center py-14 bg-[#dddddd]">
            <div>
              <h2 className="font-bold text-[#333333] font-sans text-2xl md:text-3xl">
                How SHG Bazaar Works
              </h2>
              <p className="text-[#333333] md:text-[17px] px-2 md:px-0 mt-4">
                Simple steps to discover and purchase authentic Goan products
              </p>
            </div>
            <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-10 text-center pt-10">
              <ProcessCard
                Number={"1"}
                Title={"Browse Products"}
                Description={
                  "Explore our curated collection of Goan products from verified SHGs"
                }
              />
              <ProcessCard
                Number={"2"}
                Title={"Connect with SHGs"}
                Description={
                  "View seller details and communicate your requirements through our platform"
                }
              />
              <ProcessCard
                Number={"3"}
                Title={"Secure Checkout"}
                Description={
                  "Place your order using our secure gateway or choose cash on delivery"
                }
              />
              <ProcessCard
                Number={"4"}
                Title={"Receive & Enjoy"}
                Description={
                  "Get your authentic Goan products delivered safely to your doorstep"
                }
              />
            </div>
          </section>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 5 }}
        >
          <BottomButtonSection setLoading={setLoading} />
          <Footer setLoading={setLoading} />
        </motion.div>
      </>
    </>
  );
};

export default Home;
