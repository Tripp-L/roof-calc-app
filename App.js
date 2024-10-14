import React, { useState } from 'react';

function App() {
  const [twoStoryPrice, setTwoStoryPrice] = useState(5);
  const [threeStoryPrice, setThreeStoryPrice] = useState(35);

  const handlePriceChange = (setter) => (event) => {
    const value = Math.max(0, parseInt(event.target.value) || 0);
    setter(value);
  };

  return (
    <div className="App">
      <div className="input-group">
        <label>
          <input
            type="radio"
            name="homeType"
            value="2-Story"
            checked={twoStoryPrice > 0}
            onChange={handlePriceChange(setTwoStoryPrice)}
          />
          2-Story Home (+$/sq)
        </label>
        <input
          type="number"
          value={twoStoryPrice}
          onChange={handlePriceChange(setTwoStoryPrice)}
          min="0"
          style={{ width: '60px' }}
        />
      </div>

      <div className="input-group">
        <label>
          <input
            type="radio"
            name="homeType"
            value="3-Story"
            checked={threeStoryPrice > 0}
            onChange={handlePriceChange(setThreeStoryPrice)}
          />
          3-Story Home (+$/sq)
        </label>
        <input
          type="number"
          value={threeStoryPrice}
          onChange={handlePriceChange(setThreeStoryPrice)}
          min="0"
          style={{ width: '60px' }}
        />
      </div>
    </div>
  );
}

export default App;
