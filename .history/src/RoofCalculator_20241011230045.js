import React, { useState } from 'react';

const RoofCalculator = () => {
  const [squareCount, setSquareCount] = useState(25);
  const [pitch, setPitch] = useState('7-9 Silver Pledge');
  const [warranty, setWarranty] = useState('Silver Pledge');

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

  const calculateTotal = () => {
    const basePrice = squareCount * pricePerSq;
    const warrantyPrice = warrantyCosts[warranty];
    const pitchAdder = pitchAdders[pitch];
    return basePrice + warrantyPrice + pitchAdder;
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
        <h2>Total Estimate: ${calculateTotal()}</h2>
      </div>
    </div>
  );
};

export default RoofCalculator;