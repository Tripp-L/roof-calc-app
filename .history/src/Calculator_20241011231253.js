import React, { useState } from 'react';

function Calculator() {
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [result, setResult] = useState(null);

  const calculateArea = () => {
    const area = parseFloat(length) * parseFloat(width);
    setResult(area);
  };

  return (
    <div>
      <input
        type="number"
        value={length}
        onChange={(e) => setLength(e.target.value)}
        placeholder="Length"
      />
      <input
        type="number"
        value={width}
        onChange={(e) => setWidth(e.target.value)}
        placeholder="Width"
      />
      <button onClick={calculateArea}>Calculate</button>
      {result && <p>The area is: {result} square units</p>}
    </div>
  );
}

export default Calculator;