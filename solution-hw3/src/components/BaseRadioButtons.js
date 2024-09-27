import React from "react";
import "../css/baseForm.css";

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
