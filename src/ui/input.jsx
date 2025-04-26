import React from 'react';

const Input = ({ label, value, onChange, name, type }) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input
        className="add_input"
        type={type}
        id={name}
        placeholder={label}
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
