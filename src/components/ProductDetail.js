import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const ProductDetail = () => {
  const { id } = useParams(); // product id from url
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // navigate function

  useEffect(() => {
    // fetch product
    axios.get(`http://localhost:4000/products/${id}`)
      .then(response => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch product details');
        setLoading(false);
      });
  }, [id]);

  const handleGoBack = () => {
    // go back to list
    navigate('/');
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!product) return <div>No product found.</div>;

  return (
    <div className="table-container">
      <h2>Product Detail</h2>
      <div className="detail-container">
        <div>
          <p><strong>ID:</strong> {product.id}</p>
          <p><strong>Name:</strong> {product.name}</p>
          <p><strong>Price:</strong> {product.price} Euro</p>
          <p><strong>Description:</strong> {product.description}</p>
          <p><strong>Available:</strong> {product.available ? 'Yes' : 'No'}</p>
          <p><strong>Created At:</strong> {new Date(product.created_at).toLocaleString()}</p>
          <p><strong>Updated At:</strong> {new Date(product.updated_at).toLocaleString()}</p>
        </div>
      </div>

      {/* back button */}
      <button onClick={handleGoBack} className='cancel-btn'>Back to Product List</button>
    </div>
  );
};

export default ProductDetail;
