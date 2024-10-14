import React, { useState } from 'react';
import './Calculator.css';

function Calculator() {
  const [twoStoryPrice, setTwoStoryPrice] = useState(5);
  const [threeStoryPrice, setThreeStoryPrice] = useState(35);

  const adjustPrice = (setter, value) => {
    const newValue = Math.max(0, parseInt(value) || 0);
    setter(newValue);
  };

  return (
    <div className="calculator">
      <h2>Calculator</h2>
      <div className="home-type-section">
        <h3>Home Type</h3>
        <div className="home-type-option">
          <label>
            <input type="radio" name="homeType" value="2-Story" />
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
        <div className="home-type-option">
          <label>
            <input type="radio" name="homeType" value="3-Story" />
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
      {/* Other calculator components */}
    </div>
  );
}

export default Calculator;
