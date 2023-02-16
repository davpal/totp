import React from "react";

const Input = ({ name, value, onChange }) => (
  <div className="input">
    <label>{name}</label>
    <input type="text" value={value} onChange={onChange} />
  </div>
);

export default Input;
