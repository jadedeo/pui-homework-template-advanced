import React, { Component } from "react";
import "../css/baseForm.css";

class BaseRadioButtons extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const options = this.props.data;
    return (
      <>
        <label className={this.props.name}>{this.props.label}:</label>
        <div className={`${this.props.name}-container`}>
          {options.map((option, index) => {
            return (
              <div key={index}>
                <input
                  type="radio"
                  value={option.priceAdaptation}
                  hidden
                  onChange={this.props.onChangeHandler}
                  id={`${this.props.itemId}-${index}`}
                  name={`${this.props.itemId}-${this.props.name}`}
                  checked={
                    this.props.selected.priceAdaptation ===
                    option.priceAdaptation
                  }
                />
                <label
                  htmlFor={`${this.props.itemId}-${index}`}
                  className={`${this.props.name}-btn`}
                >
                  {option.optionName}
                </label>
              </div>
            );
          })}
        </div>
      </>
    );
  }
}

export default BaseRadioButtons;
