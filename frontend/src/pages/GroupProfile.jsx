import React, { useState, useEffect } from "react";
import axios from "axios";

const GroupProfile = () => {
  const [groupEmail, setGroupEmail] = useState("");
  const [profileData, setProfileData] = useState({});
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/get_grp_profile/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });

        const group = res.data?.shg_grp_details?.[0];
        const email = res.data?.group_email?.[0];
        setProfileData(group || {});
        setGroupEmail(email || null);
      } catch (error) {
        console.error("Profile data not found", error);
      }
    };

    fetchData();
  }, []);

  const openEditModal = () => {
    setEditData({ ...profileData, username: groupEmail?.username || "" });
    setIsEditOpen(true);
  };

  const handleUpdateProfile = async () => {
    try {
      const formData = new FormData();

      Object.keys(editData).forEach((key) => {
        if (editData[key] !== null && editData[key] !== undefined) {
          formData.append(key, editData[key]);
        }
      });

      const res = await axios.post(
        "http://127.0.0.1:8000/update_grp_profile/",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );

      setProfileData(res.data.updated_group);
      setIsEditOpen(false);
      alert("Group profile updated successfully");
      window.location.reload(); 
    } catch (error) {
      console.error(error);
      alert("Failed to update group profile");
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 p-8 font-sans">
    
        <header className="mb-8 bg-white rounded-3xl shadow-md p-8 flex justify-between items-center">
          <div>
            <h2 className="text-4xl font-extrabold text-gray-900">
              SHG Profile
            </h2>
            <p className="text-gray-600 mt-2 text-lg">
              Self Help Group information overview
            </p>
          </div>

          <button
            onClick={openEditModal}
            className="bg-[#bfa85f] px-6 py-3 rounded-xl font-semibold"
          >
            Edit Profile
          </button>
        </header>

      
        <section className="bg-white rounded-3xl shadow-lg p-10 max-w-5xl mx-auto">
          <h3 className="text-2xl font-semibold text-gray-900 mb-8">
            Group Details
          </h3>
          {profileData?.image && (
            <div className="flex justify-center mb-10">
              <img
                src={`http://127.0.0.1:8000/media/${profileData.image}`}
                alt="SHG"
                className="w-100 h-56 object-cover rounded-2xl shadow-lg"
              />
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { label: "SHG Name", value: profileData?.name_of_shg },
              {
                label: "Registration Number",
                value: profileData?.registration_number,
              },
              { label: "Contact Number", value: profileData?.contact_number },
              { label: "Village", value: profileData?.village },
              { label: "District", value: profileData?.district },
              { label: "Type of SHG", value: profileData?.type_of_shg },
              { label: "Email", value: groupEmail?.username },
              {
                label: "Date of Formation",
                value: profileData?.date_of_formation,
              },
            ].map(({ label, value }) => (
              <div key={label}>
                <p className="text-xs font-semibold uppercase text-gray-500 mb-2">
                  {label}
                </p>
                <div className="bg-gray-100 rounded-xl px-5 py-4 font-medium">
                  {value || "Not Available"}
                </div>
              </div>
            ))}

            <div className="md:col-span-2">
              <p className="text-xs font-semibold uppercase text-gray-500 mb-2">
                Address
              </p>
              <div className="bg-gray-100 rounded-xl px-5 py-4 font-medium">
                {profileData?.address || "Not Available"}
              </div>
            </div>
          </div>
        </section>
      </div>


      {isEditOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-8 w-full max-w-xl shadow-xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-bold mb-6">Edit SHG Profile</h3>

            <div className="space-y-4">
              {[
                ["SHG Name", "name_of_shg"],
                ["Registration Number", "registration_number"],
                ["Contact Number", "contact_number"],
                ["Email", "username"],
                ["Village", "village"],
                ["District", "district"],
                ["Type of SHG", "type_of_shg"],
                ["Date of Formation", "date_of_formation"],
              ].map(([label, key]) => (
                <input
                  key={key}
                  placeholder={label}
                  value={editData[key] || ""}
                  onChange={(e) =>
                    setEditData({ ...editData, [key]: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl border"
                />
              ))}

              <textarea
                placeholder="Address"
                value={editData.address || ""}
                onChange={(e) =>
                  setEditData({ ...editData, address: e.target.value })
                }
                className="w-full px-4 py-3 rounded-xl border"
              />

              <div className="text-left">
                <label className="capitalize text-[#333333] md:text-[15px] text-[14px]">
                  Group Picture
                </label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setEditData({ ...editData, image: e.target.files[0] })
                  }
                  className="mt-2 border bg-[#dddddd] border-[#333333] w-full rounded-xl p-2 text-[14px]"
                />

              
                {editData.image && (
                  <img
                    src={
                      editData.image instanceof File
                        ? URL.createObjectURL(editData.image)
                        : `http://127.0.0.1:8000/media/${editData.image}`
                    }
                    alt="Preview"
                    className="w-32 h-32 object-cover rounded-lg mt-4 border"
                  />
                )}
              </div>
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

export default GroupProfile;
