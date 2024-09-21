import React, { Component } from "react";
import BaseSelect from "./BaseSelect";
import BaseRadioButtons from "./BaseRadioButtons";
import glazingOptions from "../resources/glazingOptions.json";
import packSizeOptions from "../resources/packSizeOptions.json";
import "../css/item.css";

class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      glazing: glazingOptions[0],
      packSize: packSizeOptions[0],
      price: this.props.basePrice,
    };
  }
  handleGlazingChange = (event) => {
    const selectedGlazing = glazingOptions.find(
      (option) => option.priceAdaptation === Number(event.target.value)
    );
    this.setState({ glazing: selectedGlazing }, () => {
      this.calculatePrice();
    });
  };

  handlePackSizeChange = (event) => {
    const selectedPackSize = packSizeOptions.find(
      (option) => option.priceAdaptation === Number(event.target.value)
    );
    this.setState({ packSize: selectedPackSize }, () => {
      this.calculatePrice();
    });
  };

  handleAddToCart = () => {
    const finalGlazing = this.state.glazing;
    const finalPackSize = this.state.packSize;
    const finalPrice = Number(this.state.price).toFixed(2);

    const newItem = {
      name: this.props.itemName,
      glazing: finalGlazing,
      packSize: finalPackSize,
      price: finalPrice,
    };

    this.props.sendDataToParent(newItem);
  };

  calculatePrice = () => {
    const newPrice = (
      (this.props.basePrice + this.state.glazing.priceAdaptation) *
      this.state.packSize.priceAdaptation
    ).toFixed(2);
    this.setState({ price: newPrice });
  };

  render() {
    return (
      <div className="product-card" id={this.props.itemId}>
        <img
          className="product-image"
          src={this.props.imageUrl}
          alt={this.props.imageAlt}
        />
        <h3>{this.props.itemName}</h3>
        <div className="product-options">
          <BaseSelect
            data={glazingOptions}
            label="Glazing"
            name="glazing"
            onChangeHandler={this.handleGlazingChange}
          />

          <BaseRadioButtons
            data={packSizeOptions}
            itemId={this.props.itemId}
            label="Pack Size"
            name="pack-size"
            selected={this.state.packSize}
            onChangeHandler={this.handlePackSizeChange}
          />

          <p className="bold" id="Original-price">
            ${this.state.price}
          </p>

          <button
            className="add-to-cart-cta bold"
            onClick={this.handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    );
  }
}

export default Item;
