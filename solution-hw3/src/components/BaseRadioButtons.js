import React from "react";
import "../css/baseForm.css";

/** 'BaseSelect' component accepts the following props to create a set of radio buttons:
 * data: array of options
 * itemId: a property noting the type of product, used for dynamically creating unique input ids, names, etc.
 * label: select label text
 * name: name attribute text
 * selected: currently selected pack size, used for setting 'checked' property
 * onChangeHandler: function to be executed when select is changed
 */
const BaseRadioButtons = ({
  data,
  itemId,
  label,
  name,
  selected,
  onChangeHandler,
}) => {
  return (
    <>
      <label className={name}>{label}:</label>
      <div className={`${name}-container`}>
        {data.map((option, index) => {
          return (
            <div key={index}>
              <input
                type="radio"
                value={option.priceAdaptation}
                hidden
                onChange={onChangeHandler}
                id={`${itemId}-${index}`}
                name={`${itemId}-${name}`}
                checked={selected.priceAdaptation === option.priceAdaptation}
              />
              <label htmlFor={`${itemId}-${index}`} className={`${name}-btn`}>
                {option.optionName}
              </label>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default BaseRadioButtons;
