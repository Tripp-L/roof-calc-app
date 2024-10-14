import React from 'react';
import Display from './Display';
import Keypad from './Keypad';
import { evaluate } from 'mathjs';

function Calculator() {
  // ... existing state and functions ...

  const clearCalculator = () => {
    setDisplay('0');
    setExpression('');
  };

  return (
    <div className="calculator">
      <Display value={display} />
      <Keypad
        onNumberClick={handleNumberClick}
        onOperatorClick={handleOperatorClick}
        onEqualClick={handleEqualClick}
        onClearClick={clearCalculator}
      />
    </div>
  );
}

export default Calculator;
