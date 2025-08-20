import React from 'react';
import { Navbar, Nav, Container, Form, FormControl, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const NavbarComponent = () => {
  const { dark, setDark } = useTheme();

  const navStyle = {
    backgroundColor: dark ? '#000000' : '#10898d', // black in dark mode, teal in light mode
    color: '#f8f9fa',
    fontSize: dark ? '1.05rem' : '1rem',
    boxShadow: dark ? '0 2px 8px rgba(0, 0, 0, 0.8)' : '0 2px 4px rgba(0,0,0,0.1)',
    transition: 'background-color 0.3s ease, color 0.3s ease'
  };

  const linkStyle = {
    color: '#f8f9fa',
    fontSize: '1.1rem',
    fontWeight: '600',
    marginRight: '1rem'
  };

  return (
    <Navbar style={navStyle} expand="lg" variant={dark ? "dark" : "dark"}>
      <Container>
        <Navbar.Brand as={Link} to="/" style={{ color: '#f8f9fa', fontWeight: '700', fontSize: '1.5rem' }}>
          E-Shop
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/men" style={linkStyle}>Men</Nav.Link>
            <Nav.Link as={Link} to="/women" style={linkStyle}>Women</Nav.Link>
            <Nav.Link as={Link} to="/kids" style={linkStyle}>Kids</Nav.Link>
            <Nav.Link as={Link} to="/admin" style={linkStyle}>Admin</Nav.Link>
            <Nav.Link as={Link} to="/cart" style={linkStyle}>Cart</Nav.Link>
          </Nav>
          <Form className="d-flex align-items-center">
            <FormControl
              type="text"
              placeholder="Search"
              className="me-2"
              style={{ maxWidth: '200px' }}
              aria-label="Search products"
            />
            <Button variant="outline-light" className="me-3" aria-label="Search Button">
              Search
            </Button>
            {/* Dark Mode Toggle Button */}
            <Button
              variant="outline-light"
              onClick={() => setDark(!dark)}
              title="Toggle light/dark mode"
              aria-pressed={dark}
              aria-label="Toggle dark mode"
            >
              {dark ? '☀️ Light' : '🌙 Dark'}
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;


