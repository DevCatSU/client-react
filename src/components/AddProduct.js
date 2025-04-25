import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddProduct() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [available, setAvailable] = useState(true);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    // validation
    if (name.trim().length < 1) {
      newErrors.name = "*Product name is required.";
    }
    if (description.trim().length < 1) {
      newErrors.description = "*Description is required.";
    }

    const priceValue = parseFloat(price);
    if (isNaN(priceValue) || priceValue <= 0) {
      newErrors.price = "*Price is required.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const newProduct = {
      name,
      description,
      price: priceValue,
      available,
    };

    axios
      .post("http://localhost:4000/products", { product: newProduct })
      .then(() => navigate("/"))
      .catch((error) => console.error("Error adding product:", error));
  };

  return (
    <div className="table-container">
      <div>
        <h2>Add New Product</h2>
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
                    placeholder="Name"
                  />
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
                    placeholder="Description"
                    rows={10}
                    cols={70}
                  />
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
                    placeholder="Price"
                  />
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
                    onChange={() => setAvailable(!available)}
                  />
                </td>
              </tr>
            </tbody>
          </table>

          <button type="submit" className="add-btn">
            Add Product
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
}

export default AddProduct;
