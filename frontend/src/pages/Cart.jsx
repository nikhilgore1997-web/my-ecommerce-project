import React from 'react';
import { useCart } from '../context/CartContext';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const Cart = () => {
  const { cartItems, removeFromCart } = useCart();

  const handleBuyNow = (product) => {
    alert(`🛍️ Thank you for choosing "${product.name}". Proceeding to checkout...`);
    // You can add navigation logic if needed
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">🛒 Your Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-center">Your cart is currently empty.</p>
      ) : (
        <Row>
          {cartItems.map((item) => (
            <Col key={item._id} xs={12} sm={6} md={4} lg={3} className="mb-4 d-flex">
              <Card className="w-100 shadow-sm rounded">
                <div style={{
                  height: '250px',
                  overflow: 'hidden',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                  <Card.Img
                    variant="top"
                    src={item.image}
                    alt={item.name}
                    style={{ maxHeight: '100%', width: 'auto', objectFit: 'contain' }}
                  />
                </div>

                <Card.Body className="d-flex flex-column justify-content-between">
                  <div>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text>₹{item.price}</Card.Text>
                    <Card.Text className="text-muted">Category: {item.category}</Card.Text>
                  </div>

                  <div className="d-flex justify-content-between mt-3">
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => removeFromCart(item._id)}
                    >
                      Remove
                    </Button>

                    <Button
                      variant="success"
                      size="sm"
                      onClick={() => handleBuyNow(item)}
                    >
                      Buy Now
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default Cart;
