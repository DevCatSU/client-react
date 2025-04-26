import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [availabilityFilter, setAvailabilityFilter] = useState(false);

  useEffect(() => {
    // fetch product list
    axios
      .get("http://176.34.158.54:4000/products")
      .then((response) => {
        setProducts(response.data); // set all
        setFilteredProducts(response.data); // init filtered
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const handleDelete = (id) => {
    // delete product
    axios
      .delete(`http://176.34.158.54:4000/products/${id}`)
      .then((response) => {
        console.log("Product deleted:", response.data);
        // remove from state
        setProducts(products.filter((product) => product.id !== id));
        setFilteredProducts(
          filteredProducts.filter((product) => product.id !== id)
        );
      })
      .catch((error) => console.log("Error deleting product:", error));
  };

  const handleAvailabilityChange = (e) => {
    const value = e.target.checked;
    setAvailabilityFilter(value);

    // filter by availability
    if (value) {
      const filtered = products.filter((product) => product.available === true);
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products); // show all
    }
  };

  const truncateText = (text, length) => {
    return text.length > length ? text.substring(0, length) + "..." : text;
  };

  return (
    <div className="table-container">
      <h2>Product List</h2>
      <div>
        {/* add product */}
        <div className="add-product-container">
          <Link to="/add-product">
            <button className="add-product-btn">Add New product</button>
          </Link>
        </div>

        {/* availability filter */}
        <div className="check-box-align">
          <label>
            <input
              type="checkbox"
              checked={availabilityFilter}
              onChange={handleAvailabilityChange}
            />
            Show Available Products Only
          </label>
        </div>

        {/* product table */}
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th className="l-side">Product Name</th>
              <th className="l-side">Details</th>
              <th>Price (€)</th>
              <th>Available</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td className="l-side">{product.name}</td>
                <td className="l-side">
                  {truncateText(product.description, 60)}
                </td>{" "}
                <td>{product.price}</td>
                <td>{product.available ? "Yes" : "No"}</td>{" "}
                <td>
                  <Link to={`/edit-product/${product.id}`}>
                    <button className="edit-btn">Edit</button>
                  </Link>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(product.id)}
                  >
                    Delete
                  </button>
                  <Link to={`/product-detail/${product.id}`}>
                    <button className="detail-btn">Detail</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;
