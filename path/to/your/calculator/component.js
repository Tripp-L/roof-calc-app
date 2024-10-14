function Calculator() {
  // ... existing state and functions ...

  const clearCalculator = () => {
    setDisplay('0');
    // Reset any other relevant state variables
  };

  return (
    <div className="calculator">
      {/* ... existing calculator display ... */}
      
      <div className="keypad">
        {/* ... existing number and operation buttons ... */}
        
        <button onClick={clearCalculator}>Clear</button>
      </div>
    </div>
  );
}
