import React, { useState, useEffect } from 'react';

const InputBox = ({ name, type, placeholder, value, id, icon, onChange, options, disabled }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [inputType, setInputType] = useState(type);

  useEffect(() => {
    if (name === 'year') {
      setInputType('text'); // Default type for year
    }
    if (name === 'src') {
      setInputType('text'); // Default type for src (to handle file input separately)
    }
  }, [name]);

  const handleFocus = () => {
    if (name === 'year') {
      setInputType('date');
    }
    if (name === 'src') {
      setInputType('text'); // Always set to text; handle file input differently
    }
  };

  const handleBlur = () => {
    if (name === 'year') {
      setInputType('text');
    }
    // Do not change inputType for src on blur
  };

  return (
    <div className="relative w-[100%] mb-4">
      {type === 'dropdown' ? (
        <select
          name={name}
          value={value}
          id={id}
          className="input-box"
          onChange={onChange}
        >
          <option value="" disabled>{placeholder}</option>
          {options && options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <div className="relative">
          {name === 'src' ? (
            <input
              name={name}
              type="file"
              placeholder={placeholder}
              id={id}
              className="input-box"
              onChange={onChange}
            />
          ) : (
            <input
              name={name}
              type={name === 'year' ? 'date' : (type === 'password' && passwordVisible ? 'text' : inputType)}
              placeholder={placeholder}
              value={value}
              id={id}
              className="input-box"
              onFocus={handleFocus}
              onBlur={handleBlur}
              onChange={onChange}
              disabled={disabled}
            />
          )}
          <i className={`fi ${icon} input-icon`}></i>

          {type === 'password' && (
            <i
              className={`fi fi-rr-eye${!passwordVisible ? '-crossed' : ''} input-icon left-[auto] right-4 cursor-pointer`}
              onClick={() => setPasswordVisible(!passwordVisible)}
            ></i>
          )}
        </div>
      )}
    </div>
  );
};

export default InputBox;
