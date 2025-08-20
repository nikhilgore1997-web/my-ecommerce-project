// src/pages/AddProduct.js
import React, { useState } from "react";
import axios from "axios";

export default function AddProduct() {
  const [productData, setProductData] = useState({
    name: "",
    price: "",
    category: "",
    description: ""
  });

  const handleChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = JSON.parse(localStorage.getItem("admin")).token;
      await axios.post("http://localhost:5000/api/admin/products", productData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Product added successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to add product");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" onChange={handleChange} placeholder="Product Name" required />
      <input name="price" type="number" onChange={handleChange} placeholder="Price" required />
      <input name="category" onChange={handleChange} placeholder="Category" required />
      <textarea name="description" onChange={handleChange} placeholder="Description" />
      <button type="submit">Add Product</button>
    </form>
  );
}
