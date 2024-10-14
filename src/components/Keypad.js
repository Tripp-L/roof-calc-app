import React from 'react';
import Button from './Button';

function Keypad({ onNumberClick, onOperatorClick, onEqualClick, onClearClick }) {
  // ... existing button definitions ...

  return (
    <div className="keypad">
      {/* ... existing buttons ... */}
      <Button onClick={onEqualClick} label="=" />
      <Button onClick={onClearClick} label="Clear" />
    </div>
  );
}

export default Keypad;
