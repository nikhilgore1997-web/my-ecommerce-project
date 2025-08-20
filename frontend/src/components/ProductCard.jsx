import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
    alert('✅ Product added to cart!');
  };

  const handleBuyNow = () => {
    alert(`🛒 Proceeding to buy "${product.name}"...`);
  };

  return (
    <Card
      className="shadow-sm"
      style={{
        width: '100%',     // full width within Col
        maxWidth: '360px', // fixed max width for better consistency
        margin: 'auto',
        borderRadius: '15px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: '460px',   // fixed height for uniformity
        padding: '10px',
        transition: 'box-shadow 0.3s ease, transform 0.3s ease',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.boxShadow = '0 12px 25px rgba(0,0,0,0.15)';
        e.currentTarget.style.transform = 'translateY(-5px)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
        e.currentTarget.style.transform = 'none';
      }}
    >
      <Link to={`/product/${product._id || product.id}`} style={{ textDecoration: 'none' }}>
        <div
          style={{
            width: '100%',
            height: '280px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
            borderRadius: '15px 15px 0 0',
            backgroundColor: '#fff',
            marginBottom: '10px',
          }}
        >
          <img
            src={product.image}
            alt={product.name}
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              objectFit: 'contain',
              display: 'block',
            }}
          />
        </div>
      </Link>

      <Card.Body className="d-flex flex-column justify-content-between p-0">
        <div>
          <Card.Title
            style={{
              fontWeight: '600',
              fontSize: '1.15rem',
              color: '#1a1a1a',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
            title={product.name}
          >
            <Link to={`/product/${product._id || product.id}`} style={{ color: 'inherit' }}>
              {product.name}
            </Link>
          </Card.Title>

          <Card.Text
            style={{
              fontSize: '13px',
              color: '#6c757d',
              height: '42px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
            title={product.description}
          >
            {product.description}
          </Card.Text>

          <Card.Text
            style={{ fontWeight: '700', fontSize: '1.2rem', color: '#333', marginTop: '5px' }}
          >
            ₹{product.price}
          </Card.Text>

          <Card.Text style={{ fontSize: '12px', color: '#888' }}>
            Category: {product.category}
          </Card.Text>
        </div>

        <div className="d-flex gap-2 mt-3">
          <Button variant="outline-primary" size="sm" onClick={handleAddToCart} style={{ flex: 1 }}>
            Add to Cart
          </Button>
          <Button variant="primary" size="sm" onClick={handleBuyNow} style={{ flex: 1 }}>
            Buy Now
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;



