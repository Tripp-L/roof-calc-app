import React, { useState } from 'react';

function App() {
  const [homeType, setHomeType] = useState('');

  const handleHomeTypeChange = (event) => {
    setHomeType(event.target.value);
  };

  return (
    <div className="App">
      <div className="input-group">
        <label>
          <input
            type="radio"
            name="homeType"
            value="2-Story"
            checked={homeType === '2-Story'}
            onChange={handleHomeTypeChange}
          />
          2-Story Home (+$/sq)
        </label>
        <input type="text" value="$ 5" readOnly />
      </div>

      <div className="input-group">
        <label>
          <input
            type="radio"
            name="homeType"
            value="3-Story"
            checked={homeType === '3-Story'}
            onChange={handleHomeTypeChange}
          />
          3-Story Home (+$/sq)
        </label>
        <input type="text" value="$ 35" readOnly />
      </div>
    </div>
  );
}

export default App;
