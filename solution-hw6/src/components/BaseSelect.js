import React from "react";
import "../css/baseForm.css";

/** 'BaseSelect' component accepts the following props to create a dropdown:
 * data: array of options
 * label: select label text
 * name: name attribute text
 * onChangeHandler: function to be executed when select is changed
 */
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
