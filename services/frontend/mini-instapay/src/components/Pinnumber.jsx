import { useState, useRef, useEffect } from 'react';

export default function PinInput({ onChange, value = '', maxLength = 4, className='' , label}) {
  const [pin, setPin] = useState(value.split('').slice(0, maxLength));
  const inputRefs = useRef([]);

  // Initialize input refs
  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, maxLength);
  }, [maxLength]);

  // Handle pin change and propagate to parent
  useEffect(() => {
    const pinValue = pin.join('');
    onChange?.(pinValue);
  }, [pin, onChange]);

  // Handle input change
  const handleChange = (index, e) => {
    const value = e.target.value;
    
    // Only accept numbers
    if (!/^\d*$/.test(value)) return;
    
    // Get the last character if multiple are pasted/entered
    const digit = value.slice(-1);
    
    // Update the pin state
    const newPin = [...pin];
    newPin[index] = digit;
    setPin(newPin);
    
    // Auto-focus to next field if we entered a digit and there's a next field
    if (digit && index < maxLength - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  // Handle keydown events
  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace') {
      // If field is empty and we're not at the first field, go back
      if (!pin[index] && index > 0) {
        const newPin = [...pin];
        newPin[index - 1] = '';
        setPin(newPin);
        inputRefs.current[index - 1].focus();
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1].focus();
    } else if (e.key === 'ArrowRight' && index < maxLength - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  // Handle paste event
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain').trim();
    
    // Only proceed if we have numbers
    if (!/^\d+$/.test(pastedData)) return;
    
    // Take only what we need
    const digits = pastedData.split('').slice(0, maxLength);
    
    // Fill the pin array
    const newPin = Array(maxLength).fill('');
    digits.forEach((digit, i) => {
      newPin[i] = digit;
    });
    
    setPin(newPin);
    
    // Focus the next empty field or the last field
    const nextEmptyIndex = digits.length < maxLength ? digits.length : maxLength - 1;
    if (inputRefs.current[nextEmptyIndex]) {
      inputRefs.current[nextEmptyIndex].focus();
    }
  };

  return (

    <div className={`flex flex-col gap-2 text-sm  md:text-lg  lg:text-xl ${className}`}>
      <label className="block text-lg font-semibold text-gray-800 mb-2">
        {label} 
      </label>
      <div className='flex gap-4'>
        {Array.from({ length: maxLength }).map((_, index) => (
          <div key={index} className="  w-8 h-8 md:w-10 md:h-10   lg:w-12 lg:h-12 relative">
            <input
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              inputMode="numeric"
              maxLength="1"
              value={pin[index] || ''}
              onChange={(e) => handleChange(index, e)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={index === 0 ? handlePaste : undefined}
              className="w-full h-full text-center  font-bold bg-[#F6F6F6] rounded-lg border-2 border-gray-200 focus:outline-none shadow-sm"
              autoComplete="one-time-code"
            />
          </div>
        ))}
      </div>  
    </div>

  );
}