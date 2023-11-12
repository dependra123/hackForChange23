import React, { useState, useEffect } from "react";
import { getUserImage, fetchUserLocation } from "./firebase.js";
import Papa from 'papaparse';

export default function Buyer() {
    const [userImage, setUserImage] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const [data, setData] = useState([]);

    useEffect(() => {
        setUserImage(getUserImage());
        /*
        here is data put it in setData
        image,price,name,location
        https://upload.wikimedia.org/wikipedia/commons/8/89/Tomato_je.jpg,1.99,tomato,"535 8 Ave SE #104, Calgary, AB T2G 5S9"
        https://static.wikia.nocookie.net/fruits-information/images/2/2b/Apple.jpg/revision/latest?cb=20180802112257,1.99,apple,"56307 Lily Lake Rd, Bon Accord, AB T0A 0K0"
        https://www.eatingwell.com/thmb/wu-Dmj_tOxXCDcamya9aQU-5vqA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Is-It-Safe-to-Eat-Romaine-Lettuce-d78b20b0c9444d61b9d4adda8a432aba.jpg,3.25,romaine lettuce,"3630 50 Ave SE, Calgary, AB T2B 3N9"
        https://specialtyproduce.com/sppics/8454.png,5.18,baby kale,"3630 50 Ave SE, Calgary, AB T2B 3N9"
        https://i5.walmartimages.ca/images/Enlarge/234/6_r/6000191272346_R.jpg,1.49,orange,"3624 Burnsland Rd SE, Calgary, AB T2G 3Z2"
        https://www.cartly.ca/cdn/shop/products/image_22f97cea-21d2-4d5b-95c9-1e17208ed84e.jpg?v=1647206562,5.98,grapes,"3515 26 St NE, Calgary, AB T1Y 7E3, Canada"
        https://static.wixstatic.com/media/01799f_e2a4c569d0c84d1fb88247eaea10f2e9~mv2.webp,2.79,pear,"2335 Pegasus Rd NE, Calgary, AB T2E 8C3, Canada"
            https://upload.wikimedia.org/wikipedia/commons/2/25/Onion_on_White.JPG,1.47,onion,"1250 McKinnon Dr NE, Calgary, AB T2E 7T7, Canada"
https://www.sunsetgrown.com/wp-content/uploads/2020/10/cucumberlanding.png,1.79,cucumber,"2231 Banff Trail NW, Calgary, AB T2M 4L2, Canada"
https://assets.shop.loblaws.ca/products/20121509001/b2/en/front/20121509001_front_a06_@2.png,2.49,mango,"2420 37 Ave NE, Calgary, AB T2E 8S6, Canada"
        */
       setData([
            { 'image': "https://upload.wikimedia.org/wikipedia/commons/8/89/Tomato_je.jpg,1.99",'name':"tomato",'location': "535 8 Ave SE #104 Calgary AB T2G 5S9"},
            { 'image': "https://static.wikia.nocookie.net/fruits-information/images/2/2b/Apple.jpg/revision/latest?cb=20180802112257,1.99",'name':"apple",'location': "56307 Lily Lake Rd Bon Accord AB T0A 0K0"},
            { 'image': "https://www.eatingwell.com/thmb/wu-Dmj_tOxXCDcamya9aQU-5vqA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Is-It-Safe-to-Eat-Romaine-Lettuce-d78b20b0c9444d61b9d4adda8a432aba.jpg,3.25",'name':"romaine lettuce",'location': "3630 50 Ave SE Calgary AB T2B 3N9"},
            { 'image': "https://specialtyproduce.com/sppics/8454.png,5.18",'name':"baby kale",'location': "3630 50 Ave SE Calgary AB T2B 3N9"},
            { 'image': "https://i5.walmartimages.ca/images/Enlarge/234/6_r/6000191272346_R.jpg,1.49",'name':"orange",'location': "3624 Burnsland Rd SE Calgary AB T2G 3Z2"},
            { 'image': "https://www.cartly.ca/cdn/shop/products/image_22f97cea-21d2-4d5b-95c9-1e17208ed84e.jpg?v=1647206562,5.98",'name':"grapes",'location': "3515 26 St NE Calgary AB T1Y 7E3 Canada"},
           
            { 'image': "https://static.wixstatic.com/media/01799f_e2a4c569d0c84d1fb88247eaea10f2e9~mv2.webp,2.79",'name':"pear",'location': "2335 Pegasus Rd NE Calgary AB T2E 8C3 Canada"},
            { 'image': "https://upload.wikimedia.org/wikipedia/commons/2/25/Onion_on_White.JPG,1.47",'name':"onion",'location': "1250 McKinnon Dr NE Calgary AB T2E 7T7 Canada"},
            { 'image': "https://www.sunsetgrown.com/wp-content/uploads/2020/10/cucumberlanding.png,1.79",'name':"cucumber",'location': "2231 Banff Trail NW Calgary AB T2M 4L2 Canada"},
       ]);
       
        
    }, []);

    useEffect(() => {
        console.log("Fetching user product...");
        setFilteredData(
            data.filter((product) =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }, [searchTerm]);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        <div className="buyer-page">
            <div className="user-image">
                <img src={userImage} alt="User" />
            </div>
            <div className="search-bar">
                <input type="text" placeholder="Search Products" onChange={handleSearch} />
            </div>
            <div className="product-list">
                {filteredData.map((product) => (
                    <div key={product.id}>
                        
                        <p>{product.name}</p>
                        <p>$5</p>
                    </div>
                ))}
            </div>
        </div>
    );
}