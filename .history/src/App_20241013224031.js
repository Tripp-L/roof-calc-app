import React from 'react';
import Calculator from './components/Calculator';
import './App.css';

function App() {
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