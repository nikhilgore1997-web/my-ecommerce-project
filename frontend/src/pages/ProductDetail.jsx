import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Button, Spinner } from 'react-bootstrap';

const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const products = useSelector((state) => state.products.items);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const foundProduct = products.find((p) => p._id === productId || p.id === productId);

    if (foundProduct) {
      setProduct(foundProduct);
      setLoading(false);
    } else {
      const fetchProduct = async () => {
        try {
          const res = await axios.get(`/api/products/${productId}`);
          setProduct(res.data);
          setLoading(false);
        } catch {
          setError('Product not found.');
          setLoading(false);
        }
      };
      fetchProduct();
    }
  }, [productId, products]);

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <Spinner animation="border" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5 text-center">
        <h3>{error}</h3>
        <Button variant="primary" onClick={() => navigate('/')}>
          Back to Home
        </Button>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <Button as={Link} to="/" variant="secondary" className="mb-4">
        &larr; Back to Home
      </Button>

      <div className="row">
        <div className="col-md-6 text-center">
          <img
            src={product.image}
            alt={product.name}
            className="img-fluid rounded border"
            style={{
              maxHeight: 400,
              maxWidth: '100%',
              objectFit: 'contain',
              backgroundColor: '#fff',
              padding: '1.5rem'
            }}
          />
        </div>

        <div className="col-md-6">
          <h2>{product.name}</h2>
          <p className="lead">{product.description || 'No description available.'}</p>
          <h4 className="mt-4">Price: ₹{product.price}</h4>
          <h5 className="mt-3">Category: {product.category}</h5>

          <section className="mt-5">
            <h5>Size Chart</h5>
            <p>Available sizes: S, M, L, XL, XXL</p>
          </section>

          <section className="mt-4">
            <h5>Customer Reviews</h5>
            <p>No reviews yet. Be the first to leave a review!</p>
          </section>

          <section className="mt-4">
            <h5>Special Offers</h5>
            <p>10% off on purchase above ₹2000. Use code: ESHOP10</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
