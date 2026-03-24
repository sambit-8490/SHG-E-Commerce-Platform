import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminProductCard from "../components/AdminProductCard";
import AddProductForm from "../components/AddProductForm.jsx";
import GroupProfile from "./GroupProfile.jsx";
import OrderManagement from "../components/OrderManagement.jsx"; 
import AdminProductViewCard from "../components/AdminProductViewCard.jsx";

const AdminPanel = () => {
  const [productList, setProductList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [activeSection, setActiveSection] = useState("dashboard");
  const navigate = useNavigate();
  const [viewProduct, setViewProduct] = useState(null);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/get_group_products/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      setProductList(res.data.products_list);
    } catch {
      console.error("Products not found");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleEdit = (product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this product?")) {
      try {
        await axios.post(
          `http://127.0.0.1:8000/delete_product/${id}/`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          },
        );
        alert("Product deleted successfully");
        fetchProducts();
      } catch {
        alert("Delete failed");
      }
    }
  };

  const handleView = (product) => {
    setViewProduct(product);
  };

  const logOut = () => {
    localStorage.removeItem("access_token");
    alert("logged out successfully.");
    navigate("/");
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 flex font-sans">
        {/* Sidebar */}
        <aside className="fixed top-0 left-0 z-40 w-64 h-full bg-gray-900 text-[#bfa85f] shadow-xl p-6 flex flex-col">
          <div className="mb-12">
            <h2 className="text-3xl font-extrabold tracking-wider">
              SHG Admin
            </h2>
          </div>
          <nav className="flex-1 space-y-3 text-sm font-semibold tracking-wide">
            {[
              { key: "dashboard", label: "Dashboard" },
              { key: "orders", label: "Manage Orders" }, // NEW LINK
              { key: "profile", label: "Profile" },
            ].map((item) => (
              <button
                key={item.key}
                onClick={() => setActiveSection(item.key)}
                className={`w-full px-5 py-3 rounded-xl transition-colors duration-300 ease-in-out text-left ${
                  activeSection === item.key
                    ? "bg-[#bfa85f] text-gray-900 shadow-md"
                    : "text-[#bfa85f] hover:bg-[#a18d46] hover:text-gray-900"
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={logOut}
              className="w-full px-5 py-3 mt-4 rounded-xl text-red-400 hover:bg-red-600 hover:text-white font-semibold transition-colors duration-300"
            >
              Logout
            </button>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 ml-64 p-8 max-w-7xl w-full">
          {activeSection === "dashboard" && (
            <>
              <header className="flex justify-between items-center mb-10">
                <h1 className="text-4xl font-extrabold text-gray-900 tracking-wide">
                  Admin Dashboard
                </h1>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-[#bfa85f] text-gray-900 font-semibold px-8 py-3 rounded-xl shadow-md hover:bg-[#a18d46] transition-colors duration-300"
                >
                  Add Product
                </button>
              </header>

              {isLoading ? (
                <p className="text-gray-600 text-lg">Loading products...</p>
              ) : (
                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {productList.length > 0 ? (
                    productList.map((product) => (
                      <AdminProductCard
                        key={product.id}
                        {...product}
                        onDelete={() => handleDelete(product.id)}
                        onEdit={() => handleEdit(product)}
                        onView={() => handleView(product)}
                      />
                    ))
                  ) : (
                    <p className="text-gray-500 col-span-full text-center mt-20 text-lg">
                      No products available.
                    </p>
                  )}
                </section>
              )}
            </>
          )}
          {activeSection === "orders" && <OrderManagement />}{" "}
          {/* NEW SECTION */}
          {activeSection === "profile" && <GroupProfile />}
        </main>

        {/* Modal */}
        {isModalOpen && (
          <AddProductForm
            isOpen={isModalOpen}
            initialData={editingProduct}
            onClose={handleCloseModal}
            onSubmit={fetchProducts}
          />
        )}

        {viewProduct && (
          <AdminProductViewCard
            product={{
              name: viewProduct.product_name,
              category: viewProduct.category,
              description: viewProduct.description,
              price: viewProduct.price,
              stock: viewProduct.stock_quantity,
              status: viewProduct.is_active ? "Active" : "Inactive",
              image: `http://127.0.0.1:8000/media/${viewProduct.image}`,
            }}
            onClose={() => setViewProduct(null)}
          />
        )}
      </div>
    </>
  );
};

export default AdminPanel;
