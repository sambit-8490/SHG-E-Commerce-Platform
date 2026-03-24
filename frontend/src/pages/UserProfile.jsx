import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import PendingOrders from "../components/PendingOrders";
import OrderHistory from "../components/OrderHistory";

const UserProfile = () => {
  const [profileData, setProfileData] = useState({});
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editData, setEditData] = useState({});

  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear("access_token");
    alert("Logged out successfully");
    navigate("/");
  };

 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/get_user_profile/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });
        setProfileData(res.data.user_details[0]);
      } catch (err) {
        console.error("Profile data not found", err);
      }
    };
    fetchData();
  }, []);


  const openEditModal = () => {
    setEditData(profileData);
    setIsEditOpen(true);
  };

  
  const handleUpdateProfile = async () => {
    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/update_user_profile/",
        editData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        },
      );

      setProfileData(res.data.updated_user);
      setIsEditOpen(false);
      alert("Profile updated successfully");
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("Failed to update profile");
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 flex font-sans">
    
        <aside className="w-64 bg-gray-900 text-[#bfa85f] hidden md:flex flex-col sticky top-0 h-screen">
          <div className="p-6 border-b border-[#bfa85f]">
            <h2 className="text-2xl font-semibold">User Profile</h2>
            <p className="text-sm uppercase mt-1">Member Panel</p>
          </div>

          <nav className="flex-1 p-6 space-y-4">
            {[
              { label: "Profile", value: "profile" },
              { label: "Pending Orders", value: "pending" },
              { label: "Delivered Orders", value: "delivered" },
            ].map((item) => (
              <button
                key={item.value}
                onClick={() => setActiveTab(item.value)}
                className={`w-full text-left px-5 py-3 rounded-xl font-semibold transition ${
                  activeTab === item.value
                    ? "bg-[#bfa85f] text-gray-900"
                    : "hover:bg-gray-800"
                }`}
              >
                {item.label}
              </button>
            ))}

            <button
              onClick={logout}
              className="w-full text-left px-5 py-3 rounded-xl hover:bg-gray-800 font-semibold"
            >
              Logout
            </button>
          </nav>
        </aside>

        <main className="flex-1 p-8 max-w-7xl mx-auto space-y-8">
        
          <div className="bg-white rounded-3xl shadow-lg p-8">
            <h1 className="text-4xl font-extrabold text-gray-900">
              Welcome, {profileData?.customer_name || "User"}
            </h1>
            <p className="text-gray-600 mt-2">
              Manage your profile and orders efficiently.
            </p>
          </div>

 
          {activeTab === "profile" && (
            <section className="bg-white rounded-3xl shadow-lg p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-extrabold">Profile Information</h2>
                <button
                  onClick={openEditModal}
                  className="bg-[#bfa85f] px-6 py-2 rounded-xl font-semibold"
                >
                  Edit Profile
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  { label: "Name", value: profileData?.customer_name },
                  { label: "Email", value: profileData?.customer_email },
                  { label: "Phone", value: profileData?.phone_number },
                  { label: "Address", value: profileData?.address },
                ].map((item, i) => (
                  <div key={i}>
                    <p className="text-xs uppercase text-gray-500 mb-2">
                      {item.label}
                    </p>
                    <div className="bg-gray-50 px-6 py-4 rounded-xl font-semibold">
                      {item.value || "Not Available"}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {activeTab === "pending" && (
            <div className="bg-white rounded-3xl shadow-lg p-8">
              <PendingOrders />
            </div>
          )}

          {activeTab === "delivered" && (
            <div className="bg-white rounded-3xl shadow-lg p-8">
              <OrderHistory />
            </div>
          )}
        </main>
      </div>


      {isEditOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-8 w-full max-w-xl shadow-xl">
            <h3 className="text-2xl font-bold mb-6">Edit Profile</h3>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                value={editData.customer_name || ""}
                onChange={(e) =>
                  setEditData({ ...editData, customer_name: e.target.value })
                }
                className="w-full px-4 py-3 rounded-xl border"
              />

              <input
                type="email"
                placeholder="Email"
                value={editData.customer_email || ""}
                onChange={(e) =>
                  setEditData({ ...editData, customer_email: e.target.value })
                }
                className="w-full px-4 py-3 rounded-xl border"
              />

              <input
                type="text"
                placeholder="Phone"
                value={editData.phone_number || ""}
                onChange={(e) =>
                  setEditData({ ...editData, phone_number: e.target.value })
                }
                className="w-full px-4 py-3 rounded-xl border"
              />

              <textarea
                placeholder="Address"
                value={editData.address || ""}
                onChange={(e) =>
                  setEditData({ ...editData, address: e.target.value })
                }
                className="w-full px-4 py-3 rounded-xl border"
              />
            </div>

            <div className="flex justify-end gap-4 mt-8">
              <button
                onClick={() => setIsEditOpen(false)}
                className="px-6 py-2 rounded-xl border"
              >
                Cancel
              </button>

              <button
                onClick={handleUpdateProfile}
                className="px-6 py-2 rounded-xl bg-[#bfa85f] font-semibold"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserProfile;
