import React, { useState } from 'react';
import './Calculator.css';

function Calculator() {
  const [twoStoryPrice, setTwoStoryPrice] = useState(5);
  const [threeStoryPrice, setThreeStoryPrice] = useState(35);

  const adjustPrice = (setter, currentValue, increment) => {
    setter(Math.max(0, currentValue + increment));
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
          <div className="price-input">
            <button onClick={() => adjustPrice(setTwoStoryPrice, twoStoryPrice, -1)}>-</button>
            <input 
              type="number" 
              value={twoStoryPrice} 
              onChange={(e) => setTwoStoryPrice(Math.max(0, parseInt(e.target.value) || 0))}
            />
            <button onClick={() => adjustPrice(setTwoStoryPrice, twoStoryPrice, 1)}>+</button>
          </div>
        </div>
        <div className="home-type-option">
          <label>
            <input type="radio" name="homeType" value="3-Story" />
            3-Story Home (+$/sq)
          </label>
          <div className="price-input">
            <button onClick={() => adjustPrice(setThreeStoryPrice, threeStoryPrice, -1)}>-</button>
            <input 
              type="number" 
              value={threeStoryPrice} 
              onChange={(e) => setThreeStoryPrice(Math.max(0, parseInt(e.target.value) || 0))}
            />
            <button onClick={() => adjustPrice(setThreeStoryPrice, threeStoryPrice, 1)}>+</button>
          </div>
        </div>
      </div>
      {/* Other calculator components */}
    </div>
  );
}

export default Calculator;
