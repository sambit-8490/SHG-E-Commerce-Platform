import React, { useState, useEffect } from "react";
import { Plus, X, ShoppingBag } from "lucide-react";
import axios from "axios";

const initialState = {
  product_name: "",
  category: "",
  price: "",
  stock_quantity: "",
  description: "",
  image: null,
};

const AddProductForm = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState(initialState);
  const [imagePreview, setImagePreview] = useState(null);
  const isEditing = !!initialData;

  useEffect(() => {
    if (isEditing) {
      setFormData(initialData);
      // If it's a string, it's the URL from the backend
      setImagePreview(typeof initialData.image === 'string' ? `http://127.0.0.1:8000/media/${initialData.image}` : null);
    } else {
      setFormData(initialState);
      setImagePreview(null);
    }
  }, [initialData, isOpen, isEditing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (const key in formData) {
      // Don't append the image if it's still a string (hasn't been changed)
      if (key === 'image' && typeof formData[key] === 'string') continue;
      if (formData[key] !== null) {
        data.append(key, formData[key]);
      }
    }

    try {
      const url = isEditing 
        ? `http://127.0.0.1:8000/adminpanel/updateproduct/${initialData.id}/` 
        : "http://127.0.0.1:8000/adminpanel/addproduct/";
      
      const response = await axios.post(url, data, {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    "Content-Type": "multipart/form-data",
  },
});


      alert(isEditing ? "Product updated successfully!" : "Product added successfully!");
      onSubmit();
      onClose();
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error: " + JSON.stringify(error.response?.data || "Server Error"));
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold text-zinc-900">
            {isEditing ? "Edit Product" : "Add New Product"}
          </h2>
          <button onClick={onClose} className="text-zinc-500 hover:text-zinc-800">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-zinc-700">Product Name*</label>
              <input type="text" name="product_name" value={formData.product_name} onChange={handleChange} className="mt-1 block w-full rounded-md border-zinc-300 shadow-sm focus:border-amber-500 focus:ring-amber-500" required />
            </div>

            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-zinc-700">Product Category*</label>
              <input type="text" name="category" value={formData.category} onChange={handleChange} className="mt-1 block w-full rounded-md border-zinc-300 shadow-sm focus:border-amber-500 focus:ring-amber-500" required />
            </div>

            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-zinc-700">Price (₹)*</label>
              <input type="number" name="price" step="0.01" value={formData.price} onChange={handleChange} className="mt-1 block w-full rounded-md border-zinc-300 shadow-sm focus:border-amber-500 focus:ring-amber-500" required />
            </div>

            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-zinc-700">Stock Quantity*</label>
              <input type="number" name="stock_quantity" value={formData.stock_quantity} onChange={handleChange} className="mt-1 block w-full rounded-md border-zinc-300 shadow-sm focus:border-amber-500 focus:ring-amber-500" required />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-zinc-700">Product Description*</label>
              <textarea name="description" rows="4" value={formData.description} onChange={handleChange} className="mt-1 block w-full rounded-md border-zinc-300 shadow-sm focus:border-amber-500 focus:ring-amber-500" required></textarea>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-zinc-700">Product Image</label>
              <div className="mt-1 flex items-center gap-4">
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="w-24 h-24 rounded-md object-cover" />
                ) : (
                  <div className="w-24 h-24 rounded-md bg-zinc-100 flex items-center justify-center text-zinc-400">
                    <ShoppingBag size={32} />
                  </div>
                )}
                <input type="file" name="image" onChange={handleFileChange} accept="image/*" className="block w-full text-sm text-zinc-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-amber-100 file:text-amber-700 hover:file:bg-amber-200" />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-white text-zinc-700 border border-zinc-300 rounded-md shadow-sm hover:bg-zinc-50">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-amber-400 text-zinc-900 font-semibold rounded-md shadow-sm hover:bg-amber-500">
              {isEditing ? "Update Product" : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductForm;