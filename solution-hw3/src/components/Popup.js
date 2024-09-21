import React, { Component } from "react";

class Popup extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const lastItem = this.props.lastItem;

    return (
      <div id="popup">
        <p>Added to cart:</p>
        <div id="popup-item-content">
          <p>
            <strong>{lastItem.name}</strong>
          </p>
          <p>{lastItem.glazing.optionName} glazing</p>
          <p>Pack of {lastItem.packSize.optionName}</p>
          <p>Price: ${lastItem.price}</p>
        </div>
      </div>
    );
  }
}

export default Popup;
