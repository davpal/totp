import React from "react";

const NumberInput = ({ name, value, onChange, min, max }) => (
  <div className="input">
    <label>{name}</label>
    <input
      type="number"
      value={value}
      min={min}
      max={max}
      onChange={onChange}
    />
  </div>
);

export default NumberInput;
