import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import ProductCard from '../components/ProductCard';

const Men = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then((res) => {
        const menProducts = res.data.filter(p => p.category === 'men');
        setProducts(menProducts);
      })
      .catch((err) => console.error('Error fetching men products:', err));
  }, []);

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Men's Products</h2>
      <Row>
        {products.map(product => (
          <Col key={product._id} sm={12} md={6} lg={4}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Men;
