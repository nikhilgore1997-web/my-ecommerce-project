import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import ProductCard from '../components/ProductCard';

const Kids = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    console.log('Backend URL:', process.env.REACT_APP_API_URL);
    axios.get(`${process.env.REACT_APP_API_URL}/api/products`)
      .then((res) => {
        console.log('Fetched kids products:', res.data);
        const kidsProducts = res.data.filter(p => p.category === 'kids');
        setProducts(kidsProducts);
      })
      .catch((err) => console.error('Error fetching kids products:', err));
  }, []);

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Kids' Products</h2>
      <Row>
        {products.length > 0 ? (
          products.map(product => (
            <Col key={product._id || product.id} sm={12} md={6} lg={4}>
              <ProductCard product={product} />
            </Col>
          ))
        ) : (
          <p>No kids products available.</p>
        )}
      </Row>
    </Container>
  );
};

export default Kids;
