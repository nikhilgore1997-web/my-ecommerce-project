// src/pages/Home.jsx

import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CarouselComponent from '../components/CarouselComponent';
import SecondCarousel from '../components/SecondCarousel'; // import new carousel
import ProductList from '../components/ProductList';

const Home = () => {
  return (
    <>
     <CarouselComponent />

      <Container className="text-center mt-5">
        <h1>Welcome to E-Shop</h1>
        <p>Your one-stop shop for Men, Women, and Kids Fashion!</p>

         

        {/* Your existing striped image */}
        <img
          src="https://m.media-amazon.com/images/G/31/img24/Fashion/AF/July/Stripes/2_pc._CB789547456_.jpg"
          alt="Striped 2-piece outfit"
          style={{ maxWidth: "100%", height: "auto", marginBottom: "30px", borderRadius: "8px" }}
        />

        <Link to="/men">
          <Button variant="primary" className="m-2">Shop Men</Button>
        </Link>
        <Link to="/women">
          <Button variant="success" className="m-2">Shop Women</Button>
        </Link>
        <Link to="/kids">
          <Button variant="warning" className="m-2">Shop Kids</Button>
        </Link>
      </Container>

      {/* Add the second carousel here, below the buttons */}
      <SecondCarousel />

      <Container className="mt-5">
        <h2 className="text-center mb-4">All Products</h2>
        <ProductList />
      </Container>
    </>
  );
};

export default Home;
