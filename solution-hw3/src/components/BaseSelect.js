import React, { Component } from "react";
import "../css/baseForm.css";

class BaseSelect extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const options = this.props.data;
    return (
      <>
        <label htmlFor={this.props.name}>{this.props.label}:</label>
        <select
          name={this.props.name}
          className={this.props.name}
          onChange={this.props.onChangeHandler}
        >
          {options.map((option, index) => {
            return (
              <option key={index} value={option.priceAdaptation}>
                {option.optionName}
              </option>
            );
          })}
        </select>
      </>
    );
  }
}

export default BaseSelect;
