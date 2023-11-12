
import React, { useState, useEffect } from "react";
import { getUserImage } from "./firebase.js";

const Buyer = () => {
    const [userImage, setUserImage] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const image = getUserImage();
        setUserImage(image);
    }, []);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    useEffect(() => {
        const filteredProducts = products.filter((product) =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        const sortedProducts = filteredProducts.sort((a, b) => a.closed - b.closed);
        setProducts(sortedProducts);
    }, [searchTerm]);

    const carbonEmissionsSaved = 100; // replace with actual calculation

    const handlePurchase = (product) => {
        // handle purchase logic here
    };

    return (
        <div>
            <img src={userImage} alt="User" />
            <input type="text" placeholder="Search products" onChange={handleSearch} />
            {products.map((product) => (
                <div key={product.id}>
                    <img src={product.image} alt={product.name} />
                    <h3>{product.name}</h3>
                    <p>Location: {product.location}</p>
                    <p>Price: {product.price}</p>
                    <p>Carbon Emissions Saved: {carbonEmissionsSaved}</p>
                    <button onClick={() => handlePurchase(product)}>Purchase</button>
                </div>
            ))}
        </div>
    );
};

export default Buyer;
