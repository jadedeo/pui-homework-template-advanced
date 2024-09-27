import React, { useState, useEffect } from "react";
import BaseSelect from "./BaseSelect";
import BaseRadioButtons from "./BaseRadioButtons";
import glazingOptions from "../resources/glazingOptions.json";
import packSizeOptions from "../resources/packSizeOptions.json";
import "../css/item.css";

const Item = ({
  itemId,
  imageUrl,
  imageAlt,
  itemName,
  basePrice,
  sendDataToParent,
}) => {
  const [glazing, setGlazing] = useState(glazingOptions[0]);
  const [packSize, setPackSize] = useState(packSizeOptions[0]);
  const [price, setPrice] = useState(basePrice);

  useEffect(() => {
    const newPrice = (
      (basePrice + glazing.priceAdaptation) *
      packSize.priceAdaptation
    ).toFixed(2);
    setPrice(newPrice);
  }, [basePrice, glazing, packSize]);

  const handleGlazingChange = (event) => {
    const selectedGlazing = glazingOptions.find(
      (option) => option.optionName === event.target.value
    );
    setGlazing(selectedGlazing);
  };

  const handlePackSizeChange = (event) => {
    const selectedPackSize = packSizeOptions.find(
      (option) => option.priceAdaptation === Number(event.target.value)
    );
    setPackSize(selectedPackSize);
  };

  const handleAddToCart = () => {
    const finalGlazing = glazing;
    const finalPackSize = packSize;
    const finalPrice = Number(price).toFixed(2);

    const newItem = {
      name: itemName,
      glazing: finalGlazing,
      packSize: finalPackSize,
      price: finalPrice,
    };
    sendDataToParent(newItem);
  };

  return (
    <div className="product-card" id={itemId}>
      <img className="product-image" src={imageUrl} alt={imageAlt} />
      <h3>{itemName}</h3>
      <div className="product-options">
        <BaseSelect
          data={glazingOptions}
          label="Glazing"
          name="glazing"
          onChangeHandler={handleGlazingChange}
        />

        <BaseRadioButtons
          data={packSizeOptions}
          itemId={itemId}
          label="Pack Size"
          name="pack-size"
          selected={packSize}
          onChangeHandler={handlePackSizeChange}
        />

        <p className="bold" id="Original-price">
          ${price}
        </p>

        <button className="add-to-cart-cta bold" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Item;
