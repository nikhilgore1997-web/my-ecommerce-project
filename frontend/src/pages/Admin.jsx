import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setProducts,
  addProduct,
  updateProduct,
  removeProduct,
} from "../redux/productSlice";
import { auth } from "../firebase/firebaseConfig";
import { signOut } from "firebase/auth";

const API_BASE = "http://localhost:5000/api/products";

const Admin = () => {
  const products = useSelector((state) => state.products.items);
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "men",
    image: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(API_BASE);
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        dispatch(setProducts(data));
      } catch (err) {
        setError("Error fetching products: " + err.message);
        console.error(err);
      }
    };

    fetchProducts();
  }, [dispatch]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.name.trim()) {
      setError("Product name is required.");
      return;
    }
    if (!form.price || isNaN(form.price)) {
      setError("Valid price is required.");
      return;
    }

    setLoading(true);

    const productData = {
      name: form.name.trim(),
      description: form.description.trim(),
      price: Number(form.price),
      category: form.category,
      image: form.image.trim(),
    };

    try {
      let response;
      if (editingId) {
        response = await fetch(`${API_BASE}/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(productData),
        });
      } else {
        response = await fetch(API_BASE, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(productData),
        });
      }

      if (!response.ok) {
        const msg = await response.text();
        throw new Error(msg || "Failed to save product");
      }
      const savedProduct = await response.json();

      if (editingId) {
        dispatch(updateProduct(savedProduct));
      } else {
        dispatch(addProduct(savedProduct));
      }

      setForm({
        name: "",
        description: "",
        price: "",
        category: "men",
        image: "",
      });
      setEditingId(null);
    } catch (err) {
      setError("Failed to save product: " + err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product) => {
    setForm({
      name: product.name || "",
      description: product.description || "",
      price:
        product.price !== undefined && product.price !== null
          ? product.price.toString()
          : "",
      category: product.category || "men",
      image: product.image || "",
    });
    setEditingId(product._id || product.id);
    setError("");
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      const res = await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete product");
      dispatch(removeProduct(id));
    } catch (err) {
      setError("Failed to delete product: " + err.message);
      console.error(err);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      // Optionally navigate to login page here
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>{editingId ? "Edit Product" : "Add Product"}</h2>
        <button className="btn btn-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit} className="row g-3 mb-4">
        <input
          className="form-control col-md-6"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          className="form-control col-md-6"
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />
        <input
          className="form-control col-md-4"
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          min="0"
          required
        />
        <select
          className="form-select col-md-4"
          name="category"
          value={form.category}
          onChange={handleChange}
        >
          <option value="men">Men</option>
          <option value="women">Women</option>
          <option value="kids">Kids</option>
        </select>
        <input
          className="form-control col-md-4"
          name="image"
          placeholder="Image URL"
          value={form.image}
          onChange={handleChange}
        />
        <button className="btn btn-primary col-12" type="submit" disabled={loading}>
          {loading ? (editingId ? "Updating..." : "Adding...") : editingId ? "Update Product" : "Add Product"}
        </button>
      </form>

      <h3>Product List</h3>
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-striped align-middle">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Category</th>
                <th style={{ width: "150px" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p, i) => (
                <tr key={p._id || p.id}>
                  <td>{i + 1}</td>
                  <td>
                    {p.image ? (
                      <img src={p.image} alt={p.name} width="50" height="50" />
                    ) : (
                      <span>No Image</span>
                    )}
                  </td>
                  <td>{p.name}</td>
                  <td>{p.description}</td>
                  <td>₹{p.price}</td>
                  <td>{p.category}</td>
                  <td>
                    <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(p)}>Edit</button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(p._id || p.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Admin;
