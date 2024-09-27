import React from "react";
import "../css/baseForm.css";

const BaseSelect = ({ data, label, name, onChangeHandler }) => {
  return (
    <>
      <label htmlFor={name}>{label}:</label>
      <select name={name} className={name} onChange={onChangeHandler}>
        {data.map((option, index) => {
          return (
            <option key={index} value={option.optionName}>
              {option.optionName}
            </option>
          );
        })}
      </select>
    </>
  );
};

export default BaseSelect;
