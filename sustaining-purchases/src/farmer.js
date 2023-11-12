import React, { useState } from 'react';
import { getUserImage } from './firebase';

export default function FarmerPage() {
  const userImage = getUserImage(); // This function returns the user's image
  const [items, setItems] = useState([
    { name: 'Item 1', image: '/path/to/image1.jpg', price: 10 },
    { name: 'Item 2', image: '/path/to/image2.jpg', price: 20 },
    { name: 'Item 3', image: '/path/to/image3.jpg', price: 30 },
  ]);
  const [newItemName, setNewItemName] = useState('');
  const [newItemImage, setNewItemImage] = useState('');
  const [newItemPrice, setNewItemPrice] = useState('');
  const handleRemoveItem = (name) => {
    setItems(items.filter(item => item.name !== name));
  };

  const handleAddItem = () => {
    const newItem = { name: newItemName, image: newItemImage, price: newItemPrice };
    setItems([...items, newItem]);
    setNewItemName('');
    setNewItemImage('');
    setNewItemPrice('');
  };

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
          <input type="text" placeholder="Item name" value={newItemName} onChange={e => setNewItemName(e.target.value)} />
          <input type="text" placeholder="Image URL" value={newItemImage} onChange={e => setNewItemImage(e.target.value)} />
          <input type="text" placeholder="Price" value={newItemPrice} onChange={e => setNewItemPrice(e.target.value)} />
          <button onClick={handleAddItem}>Add Item</button>
        </div>
        {items.map(item => (
        <div key={item.name} style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
          <img src={item.image} alt={item.name} style={{ width: 50, height: 50, marginRight: 10 }} />
          <div>{item.name}</div>
          <div style={{ marginLeft: 'auto' }}>${item.price}</div>
          <button onClick={() => handleRemoveItem(item.name)}>Remove Item</button>
        </div>
      ))}
      </div>
      <div>
        <img src={userImage} alt="User" style={{ width: 100, height: 100 }} />
      </div>
    </div>
  );
}
