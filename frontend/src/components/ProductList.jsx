import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import ProductCard from './ProductCard';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/api/products');
        setProducts(res.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <Row
      className="justify-content-center"
      style={{
        gap: '24px', // equal gap vertically and horizontally
        marginLeft: '12px',
        marginRight: '12px',
      }}
    >
      {products.map((product) => (
        <Col
          key={product._id}
          xs={12}
          sm={6}
          md={4}
          style={{ padding: '12px' }} // half gap on each side for equal spacing between columns
        >
          <ProductCard product={product} />
        </Col>
      ))}
    </Row>
  );
};

export default ProductList;



