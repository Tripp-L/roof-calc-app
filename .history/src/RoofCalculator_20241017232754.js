import React, { useState, useEffect, useCallback } from 'react';
import './RoofCalculator.css'; // Make sure to create this CSS file
import { debounce } from 'lodash'; // Make sure to install lodash

const RoofCalculator = () => {
  const [pricePerSq, setPricePerSq] = useState('');  // Initialize to empty string
  const [sqFt, setSqFt] = useState('');  // Keep this as empty string
  const [waste, setWaste] = useState('');  // Initialize to empty string
  const [pitch, setPitch] = useState('0-6');
  const [warranty, setWarranty] = useState('Golden Pledge');
  const [warrantyPrice, setWarrantyPrice] = useState('15');
  const [homeType, setHomeType] = useState('single');
  const [homeTypePrice, setHomeTypePrice] = useState('0');
  const [twoStoryPrice, setTwoStoryPrice] = useState('5');
  const [threeStoryPrice, setThreeStoryPrice] = useState('35');
  const [adder, setAdder] = useState('none');
  const [adderQuantity, setAdderQuantity] = useState('0');
  const [squares, setSquares] = useState(0);  // Initialize squares to 0
  const [totalPrice, setTotalPrice] = useState(0);
  const [pitchPrice, setPitchPrice] = useState('0');
  const [selectedAdders, setSelectedAdders] = useState({});

  // Define default values
  const defaultValues = {
    sqFt: '',
    waste: '10',
    pricePerSq: '',
    pitch: '0-6',
    pitchPrice: '0',
    homeType: 'single',
    homeTypePrice: '0',
    warranty: 'Golden Pledge',
    warrantyPrice: '15',
    adder: 'none',
    adderQuantity: '0'
  };

  // Function to reset all fields to default values
  // const handleClear = () => { ... };

  const pitchOptions = {
    '0-6': '0',
    '7-9': '35',
    '10-12': '55',
    '13+': '90'
  };

  const homeTypePrices = {
    'Single-Story Home': 0,
    '2-Story Home (+$/sq)': 5,
    '3-Story Home (+$/sq)': 35
  };

  const warrantyOptions = {
    'Golden Pledge': '15',
    'Silver Pledge': '11',
    'Systems': '8'
  };

  const homeTypeOptions = {
    'single': { label: 'Single-Story', price: '0' },
    'two-story': { label: '2-Story', price: '10' },
    'three-story': { label: '3-Story', price: '35' }
  };

  const adderOptions = {
    'none': { label: 'Select an Adder', price: '0' },
    'ultimate_pipe_boot': { label: 'Ultimate Pipe Boot (Neoprene)', price: '100', unit: 'Boot' },
    'soffit': { label: 'Soffit (under 12")', price: '18', unit: 'Ft' },
    'gutters_1story': { label: 'Gutters (5"-6" 1-Story)', price: '12', unit: 'Ft' },
    'gutters_2story': { label: 'Gutters (5"-6" 2-story)', price: '15', unit: 'Ft' },
    'osb': { label: 'OSB (Plywood Layer)', price: '100', unit: 'Sheet' }
  };

  const calculateTotal = () => {
    let total = 0;
    
    // Base calculation
    const baseSquares = Math.round(parseFloat(sqFt) / 100) || 0;
    const adjustedSquares = Math.round(baseSquares * (1 + (parseFloat(waste) || 0) / 100));
    total += adjustedSquares * (parseFloat(pricePerSq) || 0);

    // Add pitch price
    total += adjustedSquares * (parseFloat(pitchPrice) || 0);

    // Add home type price
    total += adjustedSquares * (parseFloat(homeTypePrice) || 0);

    // Add warranty price
    total += adjustedSquares * (parseFloat(warrantyPrice) || 0);

    // Add adder prices
    Object.entries(selectedAdders).forEach(([adderKey, quantity]) => {
      const adderPrice = parseFloat(adderOptions[adderKey].price);
      total += adderPrice * quantity;
    });

    setTotalPrice(Math.round(total * 100) / 100); // Round to 2 decimal places
    setSquares(adjustedSquares);
  };

  // Call calculateTotal whenever any input changes
  useEffect(() => {
    calculateTotal();
  }, [sqFt, waste, pricePerSq, pitchPrice, homeTypePrice, warrantyPrice, selectedAdders]);

  // Debounced calculation function
  const debouncedCalculate = debounce(calculateTotal, 300);

  // Input validation example
  const handleNumericInput = (e, setter, min = 0, max = Infinity) => {
    const value = e.target.value;
    if (value === '' || (parseFloat(value) >= min && parseFloat(value) <= max)) {
      setter(value);
      debouncedCalculate();
    }
  };

  useEffect(() => {
    calculateTotal();
  }, [sqFt, waste, pricePerSq]);

  const handlePricePerSqChange = (e) => {
    const value = e.target.value;
    if (value === '' || !isNaN(value)) {
      setPricePerSq(value);
      calculateTotal();
    }
  };

  const handlePricePerSqBlur = () => {
    if (pricePerSq === '') return;
    let value = parseInt(pricePerSq);
    if (isNaN(value) || value < 50) {
      setPricePerSq('50');
    } else if (value > 1000) {
      setPricePerSq('1000');
    } else {
      setPricePerSq(value.toString());
    }
    calculateTotal();
  };

  const handleSqFtChange = useCallback((e) => {
    handleNumericInput(e, setSqFt, 100, 100000);
  }, []);

  const handleSqFtBlur = () => {
    if (sqFt === '') return;
    let value = parseInt(sqFt);
    if (isNaN(value) || value < 100) {
      setSqFt('100');
    } else if (value > 100000) {
      setSqFt('100000');
    } else {
      setSqFt(value.toString());
    }
    calculateTotal();
  };

  const handleWasteChange = (e) => {
    const value = e.target.value;
    if (value === '' || !isNaN(value)) {
      setWaste(value);
      calculateTotal();
    }
  };

  const handleWasteBlur = () => {
    if (waste === '') return;
    let value = parseInt(waste);
    if (isNaN(value) || value < 0) {
      setWaste('0');
    } else if (value > 50) {
      setWaste('50');
    } else {
      value = Math.round(value / 5) * 5;
      setWaste(value.toString());
    }
    calculateTotal();
  };

  const handlePitchChange = (e) => {
    const selectedPitch = e.target.value;
    setPitch(selectedPitch);
    setPitchPrice(pitchOptions[selectedPitch]);
    calculateTotal();
  };

  const handlePitchPriceChange = (e) => {
    const value = e.target.value;
    if (value === '' || !isNaN(value)) {
      setPitchPrice(value);
      calculateTotal();
    }
  };

  const handlePitchPriceBlur = () => {
    let value = parseInt(pitchPrice);
    if (isNaN(value) || value < 0) {
      setPitchPrice('0');
    } else if (value > 1000) {
      setPitchPrice('1000');
    } else {
      setPitchPrice(value.toString());
    }
    calculateTotal();
  };

  const handleWarrantyChange = (e) => {
    const selectedWarranty = e.target.value;
    setWarranty(selectedWarranty);
    setWarrantyPrice(warrantyOptions[selectedWarranty]);
    calculateTotal();
  };

  const handleWarrantyPriceChange = (e) => {
    const value = e.target.value;
    if (value === '' || !isNaN(value)) {
      setWarrantyPrice(value);
      calculateTotal();
    }
  };

  const handleWarrantyPriceBlur = () => {
    let value = parseInt(warrantyPrice);
    if (isNaN(value) || value < 0) {
      setWarrantyPrice('0');
    } else if (value > 1000) {
      setWarrantyPrice('1000');
    } else {
      setWarrantyPrice(value.toString());
    }
    calculateTotal();
  };

  const handleHomeTypeChange = (e) => {
    const selectedType = e.target.value;
    setHomeType(selectedType);
    setHomeTypePrice(homeTypeOptions[selectedType].price);
    calculateTotal();
  };

  const handleHomeTypePriceChange = (e) => {
    const value = e.target.value;
    if (value === '' || !isNaN(value)) {
      setHomeTypePrice(value);
      calculateTotal();
    }
  };

  const handleHomeTypePriceBlur = () => {
    let value = parseInt(homeTypePrice);
    if (isNaN(value) || value < 0) {
      setHomeTypePrice('0');
    } else if (value > 1000) {
      setHomeTypePrice('1000');
    } else {
      setHomeTypePrice(value.toString());
    }
    calculateTotal();
  };

  const handleAdderChange = (e) => {
    const selectedAdder = e.target.value;
    if (selectedAdder !== 'none') {
      setSelectedAdders(prev => ({
        ...prev,
        [selectedAdder]: 1
      }));
    }
    calculateTotal();
  };

  const handleAdderQuantityChange = (adderKey, value) => {
    if (value === '' || (!isNaN(value) && parseInt(value) >= 0)) {
      setSelectedAdders(prev => ({
        ...prev,
        [adderKey]: value
      }));
      calculateTotal();
    }
  };

  const handleAdderQuantityBlur = (adderKey) => {
    let value = parseInt(selectedAdders[adderKey]);
    if (isNaN(value) || value < 0) {
      value = 0;
    } else if (value > 1000) {
      value = 1000;
    }
    setSelectedAdders(prev => ({
      ...prev,
      [adderKey]: value.toString()
    }));
    calculateTotal();
  };

  const removeAdder = (adderKey) => {
    setSelectedAdders(prev => {
      const newAdders = { ...prev };
      delete newAdders[adderKey];
      return newAdders;
    });
    calculateTotal();
  };

  const MemoizedInputGroup = React.memo(({ label, value, onChange, ...props }) => (
    <div className="input-group">
      <label>{label}</label>
      <input value={value} onChange={onChange} {...props} />
    </div>
  ));

  const clearCalculator = () => {
    setSqFt('');
    setWaste('10');
    setPricePerSq('');
    setPitch('0-6');
    setPitchPrice('0');
    setHomeType('single');
    setHomeTypePrice('0');
    setWarranty('Golden Pledge');
    setWarrantyPrice('15');
    setAdder('none');
    setAdderQuantity('0');
    setSquares(0);
    setTotalPrice(0);
  };

  return (
    <div className="calculator">
      <h1>Roof Calculator</h1>
      
      <div className="horizontal-inputs">
        <div className="horizontal-input-group">
          <label>Price/Sq ($)</label>
          <input 
            type="number" 
            value={pricePerSq} 
            onChange={handlePricePerSqChange}
            onBlur={handlePricePerSqBlur}
            min="50"
            max="1000"
            step="1"
          />
        </div>

        <div className="horizontal-input-group">
          <label>Sq/ft</label>
          <input 
            type="number"
            value={sqFt} 
            onChange={handleSqFtChange}
            onBlur={handleSqFtBlur}
            min="100"
            max="100000"
            step="1"
          />
        </div>

        <div className="horizontal-input-group">
          <label>Waste (%)</label>
          <input 
            type="number" 
            value={waste} 
            onChange={handleWasteChange}
            onBlur={handleWasteBlur}
            min="0"
            max="50"
            step="5"
          />
        </div>
      </div>

      <div className="input-group">
        <label>Pitch</label>
        <select value={pitch} onChange={handlePitchChange}>
          {Object.keys(pitchOptions).map(key => (
            <option key={key} value={key}>{key}</option>
          ))}
        </select>
        <div className="pitch-price-input">
          <span className="dollar-sign">$</span>
          <input 
            type="number" 
            value={pitchPrice} 
            onChange={handlePitchPriceChange}
            onBlur={handlePitchPriceBlur}
            min="0"
            max="1000"
            step="1"
          />
          <span>/Sq</span>
        </div>
      </div>

      <div className="input-group">
        <label>Warranty</label>
        <select value={warranty} onChange={handleWarrantyChange}>
          {Object.keys(warrantyOptions).map(key => (
            <option key={key} value={key}>{key}</option>
          ))}
        </select>
        <div className="warranty-price-input">
          <span className="dollar-sign">$</span>
          <input 
            type="number" 
            value={warrantyPrice} 
            onChange={handleWarrantyPriceChange}
            onBlur={handleWarrantyPriceBlur}
            min="0"
            max="1000"
            step="1"
          />
          <span>/Sq</span>
        </div>
      </div>

      <div className="input-group">
        <label>Home Type</label>
        <select value={homeType} onChange={handleHomeTypeChange}>
          {Object.entries(homeTypeOptions).map(([key, { label, price }]) => (
            <option key={key} value={key}>
              {key === 'single' 
                ? label 
                : `${label} +($${price})`}
            </option>
          ))}
        </select>
        <div className="price-input-wrapper">
          <span className="dollar-sign">$</span>
          <input 
            type="number" 
            value={homeTypePrice} 
            onChange={handleHomeTypePriceChange}
            onBlur={handleHomeTypePriceBlur}
            min="0"
            max="1000"
            step="1"
          />
          <span>/Sq</span>
        </div>
      </div>

      <div className="input-group">
        <label>Adders</label>
        <select value="none" onChange={handleAdderChange}>
          <option value="none">Select an Adder</option>
          {Object.entries(adderOptions).map(([key, { label, price, unit }]) => (
            key !== 'none' && (
              <option key={key} value={key}>
                {`${label} ($${price}/${unit})`}
              </option>
            )
          ))}
        </select>
      </div>

      {Object.entries(selectedAdders).map(([adderKey, quantity]) => (
        <div key={adderKey} className="input-group selected-adder">
          <label>{adderOptions[adderKey].label}</label>
          <div className="adder-input-wrapper">
            <input 
              type="number" 
              value={quantity} 
              onChange={(e) => handleAdderQuantityChange(adderKey, e.target.value)}
              onBlur={() => handleAdderQuantityBlur(adderKey)}
              min="0"
              max="1000"
              step="1"
            />
            <span>{adderOptions[adderKey].unit}(s)</span>
            <button className="remove-adder" onClick={() => removeAdder(adderKey)}>×</button>
          </div>
        </div>
      ))}

      <div className="results-container">
        <div className="results">
          <p>Squares: {squares}</p>
          <p>Total Price: ${totalPrice.toFixed(2)}</p>
        </div>
        <button className="clear-button clear-button-red" onClick={clearCalculator}>
          CLEAR
        </button>
      </div>
    </div>
  );
};

export default RoofCalculator;
