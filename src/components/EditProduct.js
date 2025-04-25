import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditProduct = () => {
  const { id } = useParams(); // get id from url
  const navigate = useNavigate(); // for redirect

  // form state
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [available, setAvailable] = useState(true);
  const [errors, setErrors] = useState({}); // error messages

  useEffect(() => {
    // get product by id
    axios
      .get(`http://localhost:4000/products/${id}`)
      .then((response) => {
        const product = response.data;
        setName(product.name);
        setDescription(product.description);
        setPrice(product.price);
        setAvailable(product.available);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // check empty fields
    const validationErrors = {};
    if (name.trim().length < 1) {
      validationErrors.name = "*Product name is required.";
    }
    if (description.trim().length < 1) {
      validationErrors.description = "*Description is required.";
    }
    if (price.trim() === "") {
      validationErrors.price = "*Price is required.";
    } else if (isNaN(price) || parseFloat(price) <= 0) {
      validationErrors.price = "*Price must be greater than 0.";
    }

    // if any error → stop
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // send update
    const updatedProduct = {
      name,
      description,
      price: parseFloat(price),
      available,
    };

    axios
      .patch(`http://localhost:4000/products/${id}`, {
        product: updatedProduct,
      })
      .then(() => navigate("/")) // go back
      .catch((error) => console.error("Error updating product:", error));
  };

  return (
    <div className="table-container">
      <div>
        <h2>Edit Product</h2>
        <form onSubmit={handleSubmit}>
          <table className="l-s-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Detail</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Product Name</td>
                <td>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  {/* show name error */}
                  {errors.name && (
                    <p className="error-message">{errors.name}</p>
                  )}
                </td>
              </tr>
              <tr>
                <td>Details</td>
                <td>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={10}
                    cols={70}
                  />
                  {/* show description error */}
                  {errors.description && (
                    <p className="error-message">{errors.description}</p>
                  )}
                </td>
              </tr>
              <tr>
                <td>Price (€)</td>
                <td>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                  {/* show price error */}
                  {errors.price && (
                    <p className="error-message">{errors.price}</p>
                  )}
                </td>
              </tr>
              <tr>
                <td>Available</td>
                <td>
                  <input
                    type="checkbox"
                    checked={available}
                    onChange={(e) => setAvailable(e.target.checked)}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <button type="submit" className="edit-btn">
            Update
          </button>
          <button
            type="button"
            className="cancel-btn"
            onClick={() => navigate("/")}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
