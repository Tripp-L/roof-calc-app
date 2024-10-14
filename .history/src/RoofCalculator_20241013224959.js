import React, { useState } from 'react';

const RoofCalculator = () => {
  const [squareCount, setSquareCount] = useState(25);
  const [pitch, setPitch] = useState('7-9 Silver Pledge');
  const [warranty, setWarranty] = useState('Silver Pledge');
  const [twoStoryPrice, setTwoStoryPrice] = useState(5);
  const [threeStoryPrice, setThreeStoryPrice] = useState(35);
  const [selectedHomeType, setSelectedHomeType] = useState('');

  const pricePerSq = 450;
  const roofOnlyPrice = 11250;
  const warrantyCosts = {
    'Silver Pledge': 400,
    'Golden Pledge': 500
  };
  const pitchAdders = {
    '7-9 Silver Pledge': 875,
    '10-12 Golden Pledge': 1375
  };

  const adjustPrice = (setter, value) => {
    const newValue = Math.max(0, parseInt(value) || 0);
    setter(newValue);
  };

  const calculateTotal = () => {
    const basePrice = squareCount * pricePerSq;
    const warrantyPrice = warrantyCosts[warranty];
    const pitchAdder = pitchAdders[pitch];
    const homeTypeAdder = selectedHomeType === '2-Story' ? twoStoryPrice * squareCount : 
                          selectedHomeType === '3-Story' ? threeStoryPrice * squareCount : 0;
    return basePrice + warrantyPrice + pitchAdder + homeTypeAdder;
  };

  return (
    <div>
      <h1>Roof Calculator</h1>
      <div>
        <label>
          Square Count:
          <input
            type="number"
            value={squareCount}
            onChange={(e) => setSquareCount(Number(e.target.value))}
          />
        </label>
      </div>
      <div>
        <label>
          Pitch:
          <select value={pitch} onChange={(e) => setPitch(e.target.value)}>
            <option value="7-9 Silver Pledge">7-9 Silver Pledge</option>
            <option value="10-12 Golden Pledge">10-12 Golden Pledge</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          Warranty:
          <select value={warranty} onChange={(e) => setWarranty(e.target.value)}>
            <option value="Silver Pledge">Silver Pledge</option>
            <option value="Golden Pledge">Golden Pledge</option>
          </select>
        </label>
      </div>
      <div>
        <h3>Home Style</h3>
        <div>
          <label>
            <input 
              type="radio" 
              name="homeType" 
              value="2-Story" 
              checked={selectedHomeType === '2-Story'}
              onChange={(e) => setSelectedHomeType(e.target.value)}
            />
            2-Story Home (+$/sq)
          </label>
          <div className="price-input-container">
            <span className="price-symbol">$</span>
            <input 
              type="number"
              className="price-input"
              value={twoStoryPrice}
              onChange={(e) => adjustPrice(setTwoStoryPrice, e.target.value)}
              min="0"
            />
          </div>
        </div>
        <div>
          <label>
            <input 
              type="radio" 
              name="homeType" 
              value="3-Story" 
              checked={selectedHomeType === '3-Story'}
              onChange={(e) => setSelectedHomeType(e.target.value)}
            />
            3-Story Home (+$/sq)
          </label>
          <div className="price-input-container">
            <span className="price-symbol">$</span>
            <input 
              type="number"
              className="price-input"
              value={threeStoryPrice}
              onChange={(e) => adjustPrice(setThreeStoryPrice, e.target.value)}
              min="0"
            />
          </div>
        </div>
      </div>

      <div>
        <h2>Total Estimate: ${calculateTotal()}</h2>
      </div>
    </div>
  );
};

export default RoofCalculator;
