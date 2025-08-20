import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const FooterComponent = () => {
  return (
    <footer className="bg-dark text-white mt-5 pt-4 pb-2">
      <Container>
        <Row>
          <Col md={4}>
            <h5>ShopMate</h5>
            <p>Your favorite online store for Men, Women, and Kids fashion.</p>
          </Col>

          <Col md={4}>
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/mens" className="text-white text-decoration-none">Men</a></li>
              <li><a href="/womens" className="text-white text-decoration-none">Women</a></li>
              <li><a href="/kids" className="text-white text-decoration-none">Kids</a></li>
              <li><a href="/admin" className="text-white text-decoration-none">Admin</a></li>
            </ul>
          </Col>

          <Col md={4}>
            <h5>Contact Us</h5>
            <p>Email: support@shopmate.com</p>
            <p>Phone: +91-1234567890</p>
            <div>
              <a href="#" className="text-white me-3">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="#" className="text-white me-3">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="#" className="text-white">
                <i className="bi bi-twitter"></i>
              </a>
            </div>
          </Col>
        </Row>
        <hr className="bg-white" />
        <p className="text-center">&copy; {new Date().getFullYear()} ShopMate. All rights reserved.</p>
      </Container>
    </footer>
  );
};

export default FooterComponent;
