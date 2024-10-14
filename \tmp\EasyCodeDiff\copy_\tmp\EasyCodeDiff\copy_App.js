import React, { useState } from 'react';

function App() {
  const [items, setItems] = useState([]);
  const [warranty, setWarranty] = useState('');

  const addItem = (itemName, price) => {
    setItems([...items, { name: itemName, price }]);
  };

  const calculateTotal = () => {
    const itemsTotal = items.reduce((sum, item) => sum + item.price, 0);
    const warrantyPrice = getWarrantyPrice(warranty);
    return itemsTotal + warrantyPrice;
  };

  const getWarrantyPrice = (warrantyType) => {
    // Define warranty prices here
    const warrantyPrices = {
      'basic': 50,
      'extended': 100,
      'premium': 150,
    };
    return warrantyPrices[warrantyType] || 0;
  };

  return (
    <div className="App">
      <h1>Item Calculator</h1>
      
      <div>
        <button onClick={() => addItem('Item A', 10)}>Add Item A ($10)</button>
        <button onClick={() => addItem('Item B', 20)}>Add Item B ($20)</button>
        <button onClick={() => addItem('Item C', 30)}>Add Item C ($30)</button>
      </div>

      <div>
        <select value={warranty} onChange={(e) => setWarranty(e.target.value)}>
          <option value="">Select Warranty</option>
          <option value="basic">Basic Warranty</option>
          <option value="extended">Extended Warranty</option>
          <option value="premium">Premium Warranty</option>
        </select>
      </div>

      <div>
        <h2>Items:</h2>
        <ul>
          {items.map((item, index) => (
            <li key={index}>{item.name}: ${item.price}</li>
          ))}
        </ul>
      </div>

      <div>
        <h2>Total: ${calculateTotal()}</h2>
      </div>
    </div>
  );
}

export default App;
