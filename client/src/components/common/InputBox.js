import { useState } from "react";

const InputBox = ({ name, type, placeholder, defaultValue, id, icon }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [inputType, setInputType] = useState(type);

  const handleFocus = () => {
    if (name === 'year') {
      setInputType('date');
    }
    if (name === 'file') {
      setInputType('file');
    }
  };

  const handleBlur = () => {
    if (name === 'year' && !document.getElementById(id).value) {
      setInputType('text');
    }
    if (name === 'file' && !document.getElementById(id).value) {
      setInputType('file');
    }
  };

  return (
    <div className="relative w-[100%] mb-4">
      <input
        name={name}
        type={name === "year" || name ==="file" ? inputType : (type === "password" && passwordVisible ? "text" : type)}
        placeholder={placeholder}
        defaultValue={defaultValue}
        id={id}
        className="input-box"
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <i className={"fi " + icon + " input-icon"}></i>

      {type === "password" && (
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
