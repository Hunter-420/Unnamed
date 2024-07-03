import { useState, useEffect } from "react";

const InputBox = ({ name, type, placeholder, value, id, icon, onChange }) => {
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
          value={value} // Use value for controlled inputs
          id={id}
          className="input-box"
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={onChange}
        />
      )}
      <i className={"fi " + icon + " input-icon"}></i>

      {type === 'password' && (
        <i
          className={
            "fi fi-rr-eye" +
            (!passwordVisible ? "-crossed" : "") +
            " input-icon left-[auto] right-4 cursor-pointer"
          }
          onClick={() => setPasswordVisible(!passwordVisible)}
        ></i>
      )}
    </div>
  );
};

export default InputBox;
