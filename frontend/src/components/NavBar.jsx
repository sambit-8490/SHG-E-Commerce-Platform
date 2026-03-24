import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faXmark,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/shg_baazar_logo.png";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [loader, activateLoader] = useState(false);
  const [hide, setHide] = useState(true);
  const [username, setUsername] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const token = localStorage.getItem("access_token");

  const fetchCartCount = async () => {
    if (!token) return;
    try {
      const response = await axios.get("http://127.0.0.1:8000/userform/cart/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartCount(response.data.cart_items?.length || 0);
    } catch (error) {
      console.error("Error fetching cart count", error);
    }
  };

  const logout = () => {
    localStorage.clear();
    setLoggedIn(false);
    setCartCount(0);
    alert("Logged out successfully");
    navigate("/");
  };

  useEffect(() => {
    const fetchUsername = async () => {
      if (!token) return;
      try {
        const response = await axios.get("http://127.0.0.1:8000/getusername/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsername(response.data["username"][0]["email"]);
        setLoggedIn(true);
        fetchCartCount();
      } catch {
        console.error("user not found");
      }
    };

    fetchUsername();

    window.addEventListener("cartUpdated", fetchCartCount);
    return () => window.removeEventListener("cartUpdated", fetchCartCount);
  }, [token]);

  const showLoader = (path) => {
    activateLoader(true);
    setHide(false);
    setTimeout(() => {
      activateLoader(false);
      setHide(true);
      navigate(path);
    }, 1500);
  };

  return (
    <>
      {loader && <Loader />}
      {hide && (
        <header className="flex justify-center items-center gap-70 md:gap-140 py-2 md:bg-linear-to-l md:to-[#333333] md:from-[#F5C469] bg-linear-to-b from-[#333333] to-[#3d3c3c] fixed w-full z-50">
          <div>
            <button onClick={() => navigate("/")}>
              <img
                className="w-12 h-12 md:w-15 md:h-15"
                src={logo}
                alt="Logo"
              />
            </button>
          </div>
          <div className="md:hidden">
            <FontAwesomeIcon
              icon={menuOpen ? faXmark : faBars}
              className="text-2xl text-[#F5C469] cursor-pointer"
              onClick={() => setMenuOpen(!menuOpen)}
            />
          </div>
          <nav
            className={`${menuOpen ? "flex flex-col absolute top-14 left-0 w-full bg-[#3d3c3c] py-4 space-y-4 items-center" : "hidden"} md:flex md:space-x-8 md:static md:flex-row md:justify-center md:items-center md:space-y-0 md:bg-transparent capitalize`}
          >
            <div className="flex flex-col md:flex-row justify-around items-center gap-5 md:gap-10 capitalize text-[16.5px] text-[#dddddd] md:text-[#333333]">
              <button className="capitalize" onClick={() => navigate("/")}>
                home
              </button>
              <button
                className="capitalize"
                onClick={() => showLoader("/shggroups")}
              >
                SHG Groups
              </button>
              <button
                className="capitalize"
                onClick={() => showLoader("/contact")}
              >
                contact
              </button>
              <button
                className="capitalize"
                onClick={() => showLoader("/about")}
              >
                about
              </button>

              {loggedIn && (
                <>
                  <button
                    className="relative flex items-center gap-2 text-[#F5C469] md:text-[#333333] hover:scale-110 transition-transform"
                    onClick={() => showLoader("/cart")}
                  >
                    <FontAwesomeIcon
                      icon={faShoppingCart}
                      className="text-xl"
                    />
                    {cartCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border border-white">
                        {cartCount}
                      </span>
                    )}
                    <span className="md:hidden">Cart</span>
                  </button>
                  <button
                    w-40
                    className="overflow-hidden   w-40 text-ellipsis  capitalize bg-[#F5C469] text-[#333333] md:bg-[#333333] md:text-[#dddddd] border border-[#dddddd] py-2 px-6 rounded-lg md:rounded-full "
                    onClick={() => showLoader("/userprofile")}
                  >
                    {username.split("@", 1)}
                  </button>
                  <button
                    className="capitalize text-[#F5C469] bg-[#333333] md:text-[#333333] md:bg-[#dddddd] border border-[#333333] py-2 px-6 rounded-lg md:rounded-full"
                    onClick={logout}
                  >
                    logout
                  </button>
                </>
              )}

              {!loggedIn && (
                <>
                  <button
                    className="capitalize bg-[#F5C469] text-[#333333] md:bg-[#333333] md:text-[#dddddd] border border-[#dddddd] py-2 px-6 rounded-lg md:rounded-full"
                    onClick={() => showLoader("/registrationform")}
                  >
                    register SHG
                  </button>
                  <button
                    className="capitalize text-[#F5C469] bg-[#333333] md:text-[#333333] md:bg-[#dddddd] border border-[#333333] py-2 px-6 rounded-lg md:rounded-full"
                    onClick={() => showLoader("/signup")}
                  >
                    signup
                  </button>
                </>
              )}
            </div>
          </nav>
        </header>
      )}
    </>
  );
};

export default Navbar;
