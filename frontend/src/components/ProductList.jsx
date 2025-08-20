import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import ProductCard from "./ProductCard";
import axios from "axios";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/products");

        // ✅ Ensure the response is always an array
        if (Array.isArray(res.data)) {
          setProducts(res.data);
        } else if (res.data && Array.isArray(res.data.products)) {
          setProducts(res.data.products);
        } else {
          console.error("Unexpected response format:", res.data);
          setProducts([]); // fallback to empty array
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]); // fallback in case of error
      }
    };
    fetchData();
  }, []);

  return (
    <Row
      className="justify-content-center"
      style={{
        gap: "24px", // equal gap vertically and horizontally
        marginLeft: "12px",
        marginRight: "12px",
      }}
    >
      {Array.isArray(products) && products.length > 0 ? (
        products.map((product) => (
          <Col
            key={product._id || product.id}
            xs={12}
            sm={6}
            md={4}
            style={{ padding: "12px" }}
          >
            <ProductCard product={product} />
          </Col>
        ))
      ) : (
        <p className="text-center text-muted">No products available</p>
      )}
    </Row>
  );
};

export default ProductList;
