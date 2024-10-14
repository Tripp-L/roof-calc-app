import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [pricePerSquare, setPricePerSquare] = useState(() => localStorage.getItem('pricePerSquare') || '100');
  const [sqFt, setSqFt] = useState(() => localStorage.getItem('sqFt') || '');
  const [wastePercentage, setWastePercentage] = useState(() => localStorage.getItem('wastePercentage') || '0');
  const [pitch, setPitch] = useState(() => localStorage.getItem('pitch') || '0');
  const [warranty, setWarranty] = useState(() => localStorage.getItem('warranty') || 'Systems');
  const [warrantyPrices, setWarrantyPrices] = useState(() => {
    const savedWarrantyPrices = localStorage.getItem('warrantyPrices');
    return savedWarrantyPrices ? JSON.parse(savedWarrantyPrices) : {
      Systems: 8,
      Silver: 11,
      'Golden Pledge': 15
    };
  });
  const [squareCount, setSquareCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedAdder, setSelectedAdder] = useState('');
  const [adderPrices, setAdderPrices] = useState({
    'Soffit (under 12")': 18,
    'Gutters (5"-6", 1 story)': 12,
    'Gutters (5"-6", 2 story)': 15,
    'OSB (oriented strand board)': 100,
    'Ultimate Pipe Boot (neoprene)': 100
  });
  const [adderQuantities, setAdderQuantities] = useState({
    'Soffit (under 12")': 0,
    'Gutters (5"-6", 1 story)': 0,
    'Gutters (5"-6", 2 story)': 0,
    'OSB (oriented strand board)': 0,
    'Ultimate Pipe Boot (neoprene)': 0
  });
  const [homeStories, setHomeStories] = useState('single');
  const [twoStoryPrice, setTwoStoryPrice] = useState(5);
  const [threeStoryPrice, setThreeStoryPrice] = useState(35);

  const minWarrantyPrices = {
    Systems: 8,
    Silver: 11,
    'Golden Pledge': 15
  };

  const [pitchPrices, setPitchPrices] = useState({
    '0-6': 0,
    '7-9': 35,
    '10-12': 55,
    '13+': 90
  });

  useEffect(() => {
    calculateTotalPrice();
  }, [pricePerSquare, sqFt, wastePercentage, pitch, warranty, warrantyPrices, selectedAdder, adderPrices, adderQuantities, homeStories, twoStoryPrice, threeStoryPrice]);

  useEffect(() => {
    localStorage.setItem('pricePerSquare', pricePerSquare);
    localStorage.setItem('sqFt', sqFt);
    localStorage.setItem('wastePercentage', wastePercentage);
    localStorage.setItem('pitch', pitch);
    localStorage.setItem('warranty', warranty);
    localStorage.setItem('warrantyPrices', JSON.stringify(warrantyPrices));
  }, [pricePerSquare, sqFt, wastePercentage, pitch, warranty, warrantyPrices]);

  const roundSqFt = (value) => {
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return 0;
    return Math.round(numValue / 100) * 100;
  };

  const calculateSquares = () => {
    const roundedSqFt = roundSqFt(sqFt);
    // Round up if the last two digits are 50 or greater
    return Math.ceil(roundedSqFt / 100);
  };

  const handlePitchPriceChange = (range, value) => {
    const newPrice = Math.max(0, parseInt(value) || 0);
    setPitchPrices(prev => ({...prev, [range]: newPrice}));
  };

  const getPitchRange = (pitch) => {
    if (pitch >= 0 && pitch <= 6) return '0-6';
    if (pitch >= 7 && pitch <= 9) return '7-9';
    if (pitch >= 10 && pitch <= 12) return '10-12';
    return '13+';
  };

  const calculateTotalPrice = () => {
    const baseSquares = calculateSquares();
    const wasteMultiplier = 1 + (parseInt(wastePercentage) / 100);
    const adjustedSquares = Math.ceil(baseSquares * wasteMultiplier);
    setSquareCount(adjustedSquares);

    const basePrice = adjustedSquares * parseFloat(pricePerSquare || 0);
    const warrantyAdder = warrantyPrices[warranty] * adjustedSquares;

    let total = basePrice + warrantyAdder;

    // Add the prices for all adders
    Object.keys(adderPrices).forEach(adder => {
      total += adderPrices[adder] * adderQuantities[adder];
    });

    if (homeStories === 'two') {
      total += squareCount * twoStoryPrice;
    } else if (homeStories === 'three') {
      total += squareCount * threeStoryPrice;
    }

    const pitchRange = getPitchRange(parseInt(pitch));
    total += squareCount * pitchPrices[pitchRange];

    setTotalPrice(total);
  };

  const handleSqFtChange = (e) => {
    const value = e.target.value;
    if (value === '' || /^\d+$/.test(value)) {
      setSqFt(value);
    }
  };

  const handleWarrantyChange = (e) => {
    const newWarranty = e.target.value;
    setWarranty(newWarranty);
    setWarrantyPrices(prev => ({...prev, [newWarranty]: minWarrantyPrices[newWarranty]}));
  };

  const handleWarrantyPriceChange = (e) => {
    const newPrice = parseInt(e.target.value, 10);
    setWarrantyPrices(prev => ({...prev, [warranty]: newPrice}));
  };

  const generateWarrantyPriceOptions = () => {
    // implementation of generateWarrantyPriceOptions function
  };

  const handleAdderChange = (e) => {
    setSelectedAdder(e.target.value);
  };

  const handleAdderPriceChange = (e) => {
    const newPrice = parseInt(e.target.value, 10);
    setAdderPrices(prev => ({...prev, [selectedAdder]: newPrice}));
  };

  const handleAdderQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value, 10);
    setAdderQuantities(prev => ({...prev, [selectedAdder]: newQuantity}));
  };

  const handleHomeStoriesChange = (stories) => {
    setHomeStories(stories);
  };

  function updateValue(input) {
    if (input.value < 0) input.value = 0;
    input.parentNode.nextElementSibling.textContent = '$' + input.value;
  }

  const clearCalculator = () => {
    setPricePerSquare('100');
    setSqFt('');
    setWastePercentage('0');
    setPitch('0');
    setWarranty('Systems');
    setWarrantyPrices({
      Systems: 8,
      Silver: 11,
      'Golden Pledge': 15
    });
    setSquareCount(0);
    setTotalPrice(0);
    setSelectedAdder('');
    setAdderPrices({
      'Soffit (under 12")': 18,
      'Gutters (5"-6", 1 story)': 12,
      'Gutters (5"-6", 2 story)': 15,
      'OSB (oriented strand board)': 100,
      'Ultimate Pipe Boot (neoprene)': 100
    });
    setAdderQuantities({
      'Soffit (under 12")': 0,
      'Gutters (5"-6", 1 story)': 0,
      'Gutters (5"-6", 2 story)': 0,
      'OSB (oriented strand board)': 0,
      'Ultimate Pipe Boot (neoprene)': 0
    });
    setHomeStories('single');
    setTwoStoryPrice(5);
    setThreeStoryPrice(35);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Roof Calculator</h1>
        
        <div className="space-y-6">
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">Price/Sq ($)</label>
            <input
              type="text"
              inputMode="decimal"
              value={pricePerSquare}
              onChange={(e) => setPricePerSquare(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md text-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">Sq/ft</label>
            <input
              type="text"
              inputMode="numeric"
              value={sqFt}
              onChange={handleSqFtChange}
              className="w-full p-3 border border-gray-300 rounded-md text-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">Waste</label>
            <select 
              value={wastePercentage} 
              onChange={(e) => setWastePercentage(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md text-lg focus:ring-blue-500 focus:border-blue-500"
            >
              {Array.from({ length: 36 }, (_, i) => (
                <option key={i} value={i}>{i}%</option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-lg font-semibold text-gray-700 mb-2">Pitch</label>
            <div className="flex flex-col space-y-2">
              <div className="flex items-center">
                <select 
                  value={pitch} 
                  onChange={(e) => setPitch(e.target.value)}
                  className="flex-grow p-3 border border-gray-300 rounded-md text-lg focus:ring-blue-500 focus:border-blue-500"
                >
                  {['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13+'].map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              {Object.entries(pitchPrices).map(([range, price]) => (
                <div key={range} className="flex items-center">
                  <span className="text-base font-medium text-gray-700 w-20">{range}:</span>
                  <div className="relative flex-grow">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 text-lg">$</span>
                    </div>
                    <input
                      type="number"
                      value={price}
                      onChange={(e) => handlePitchPriceChange(range, e.target.value)}
                      className="w-full p-2 pl-7 border border-gray-300 rounded-md text-lg focus:ring-blue-500 focus:border-blue-500"
                      min="0"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">Warranty</label>
            <div className="flex">
              <select 
                value={warranty} 
                onChange={handleWarrantyChange}
                className="flex-grow p-3 border border-gray-300 rounded-l-md text-lg focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="Systems">Systems</option>
                <option value="Silver">Silver</option>
                <option value="Golden Pledge">Golden Pledge</option>
              </select>
              <div className="relative flex-shrink-0">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 text-lg">$</span>
                </div>
                <select 
                  value={warrantyPrices[warranty]} 
                  onChange={handleWarrantyPriceChange}
                  className="w-24 p-3 pl-7 border border-gray-300 rounded-r-md text-lg focus:ring-blue-500 focus:border-blue-500"
                >
                  {Array.from({ length: 51 }, (_, i) => i).map(price => (
                    <option key={price} value={price}>{price}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">Home Type</label>
            <div className="space-y-2">
              <div className="input-group">
                <label>
                  <input type="radio" name="homeType" value="2-Story" checked={homeStories === 'two'} onChange={() => handleHomeStoriesChange('two')} />
                  2-Story Home (+$/sq)
                </label>
                <div className="number-input">
                  <button onClick={() => setTwoStoryPrice(Math.max(0, twoStoryPrice - 1))} type="button">-</button>
                  <input type="number" min="0" value={twoStoryPrice} onChange={(e) => setTwoStoryPrice(Math.max(0, parseInt(e.target.value) || 0))} />
                  <button onClick={() => setTwoStoryPrice(twoStoryPrice + 1)} type="button">+</button>
                </div>
                <span className="price-display">${twoStoryPrice}</span>
              </div>

              <div className="input-group">
                <label>
                  <input type="radio" name="homeType" value="3-Story" checked={homeStories === 'three'} onChange={() => handleHomeStoriesChange('three')} />
                  3-Story Home (+$/sq)
                </label>
                <div className="number-input">
                  <button onClick={() => setThreeStoryPrice(Math.max(0, threeStoryPrice - 1))} type="button">-</button>
                  <input type="number" min="0" value={threeStoryPrice} onChange={(e) => setThreeStoryPrice(Math.max(0, parseInt(e.target.value) || 0))} />
                  <button onClick={() => setThreeStoryPrice(threeStoryPrice + 1)} type="button">+</button>
                </div>
                <span className="price-display">${threeStoryPrice}</span>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-lg font-semibold text-gray-700 mb-2">Adders</label>
            <div className="flex flex-col space-y-2">
              <select 
                value={selectedAdder} 
                onChange={handleAdderChange}
                className="w-full p-3 border border-gray-300 rounded-md text-lg focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select an adder</option>
                {Object.keys(adderPrices).map(adder => (
                  <option key={adder} value={adder}>{adder}</option>
                ))}
              </select>
              {selectedAdder && (
                <div className="flex space-x-2">
                  <div className="flex-grow relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 text-lg">$</span>
                    </div>
                    <input 
                      type="number"
                      value={adderPrices[selectedAdder]}
                      onChange={handleAdderPriceChange}
                      className="w-full p-3 pl-7 border border-gray-300 rounded-md text-lg focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Price"
                      min="0"
                    />
                  </div>
                  <input 
                    type="number"
                    value={adderQuantities[selectedAdder]}
                    onChange={handleAdderQuantityChange}
                    className="w-1/3 p-3 border border-gray-300 rounded-md text-lg focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Qty"
                    min="0"
                  />
                </div>
              )}
            </div>
            {selectedAdder && (
              <div className="text-base text-gray-500 mt-2">
                {`${selectedAdder}: $${adderPrices[selectedAdder]}${selectedAdder.includes('OSB') || selectedAdder.includes('Ultimate Pipe Boot') ? '/item' : '/ft'}`}
              </div>
            )}
          </div>

          <div className="mt-8 bg-gray-50 p-4 rounded-md">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-lg font-semibold text-gray-700">Squares</p>
                <p className="text-3xl font-bold text-gray-900">{squareCount}</p>
              </div>
              <div>
                <p className="text-lg font-semibold text-gray-700">Total Price</p>
                <p className="text-3xl font-bold text-gray-900">${totalPrice.toFixed(2)}</p>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <button onClick={clearCalculator} className="w-full p-3 bg-red-500 text-white rounded-md text-lg hover:bg-red-600">Clear</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;