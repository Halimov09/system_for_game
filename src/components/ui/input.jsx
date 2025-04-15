import React from 'react';

const Input = ({ label, value, onChange, name }) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input
        type={label}
        id={name}
        placeholder={label}
        name={name}
        required
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
