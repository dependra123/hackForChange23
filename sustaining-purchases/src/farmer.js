
import React, { useState, useEffect } from "react";
import { getUserImage, getProducts, createProduct,uploadProductImage } from "./firebase.js";

function Farmer() {
  const [userImage, setUserImage] = useState(null);
  const [products, setProducts] = useState([]);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productLocation, setProductLocation] = useState("");
  const [productImage, setProductImage] = useState(null);

  useEffect(() => {
  
    setUserImage(getUserImage());
    getProducts(products);
  }, []);

  const handleAddProduct = async () => {
    setShowAddProduct(true);
  };

  const handleProductNameChange = (event) => {
    setProductName(event.target.value);
  };

  const handleProductPriceChange = (event) => {
    setProductPrice(event.target.value);
  };

  const handleProductLocationChange = (event) => {
    setProductLocation(event.target.value);
  };

  const handleProductImageChange = (event) => {
    setProductImage(event.target.files[0]);
  };

  const handleProductSubmit = async () => {
    const image = await uploadProductImage(productImage);
    createProduct({ name: productName, price: productPrice, location: productLocation, image });
    setShowAddProduct(false);
  };

  

  return (
    <div>
      <div style={{ float: "left" }}>
        <img src={userImage} alt="User" />
        <p>Sample data</p>
      </div>
      <div style={{ float: "right" }}>
        <button onClick={handleAddProduct}>Add Product</button>
        {products.map((product) => (
          <div key={product.id}>
            <img src={product.image} alt={product.name} />
            <p>{product.name}</p>
            <p>{product.price}</p>
            <p>{product.location}</p>
          </div>
        ))}
      </div>
      {showAddProduct && (
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
          <h2>Add Product</h2>
          <form onSubmit={handleProductSubmit}>
            <label>
              Name:
              <input type="text" value={productName} onChange={handleProductNameChange} />
            </label>
            <br />
            <label>
              Price:
              <input type="text" value={productPrice} onChange={handleProductPriceChange} />
            </label>
            <br />
            <label>
              Location:
              <input type="text" value={productLocation} onChange={handleProductLocationChange} />
            </label>
            <br />
            <label>
              Image:
              <input type="file" accept="image/*" onChange={handleProductImageChange} />
            </label>
            <br />
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Farmer;
