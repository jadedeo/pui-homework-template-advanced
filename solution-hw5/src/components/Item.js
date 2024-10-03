import React, { useState, useEffect } from "react";
import BaseSelect from "./BaseSelect";
import BaseRadioButtons from "./BaseRadioButtons";

// import glazing & pack size options from json files in 'resources'
import glazingOptions from "../resources/glazingOptions.json";
import packSizeOptions from "../resources/packSizeOptions.json";

import "../css/item.css";

/**'Item' component accepts the following props:
 * itemId: a property noting the type of product, used for dynamically creating unique input ids, names, etc.
 * itemName: the product's full name
 * imageUrl: src for the product's image
 * imageAlt: the alt text for the product's image
 * basePrice: the product's base price
 * handleAddToCart: function used for 'lifting state up'; passes data for the item needing to be added to 'cart' up to the parent component 'Home'
 */
const Item = ({
  itemId,
  itemName,
  imageUrl,
  imageAlt,
  basePrice,
  handleAddToCart,
}) => {
  // define state variables & functions for updating them with useState hook
  const [glazing, setGlazing] = useState(glazingOptions[0]);
  const [packSize, setPackSize] = useState(packSizeOptions[0]);
  const [price, setPrice] = useState(basePrice);

  // if 'basePrice', 'glazing' or 'packSize' is updated, recalculate the price
  useEffect(() => {
    const newPrice = (
      (basePrice + glazing.priceAdaptation) *
      packSize.priceAdaptation
    ).toFixed(2);
    setPrice(newPrice);
  }, [basePrice, glazing, packSize]);

  // update 'selectedGlazing' in state if glaze is changed
  const handleGlazingChange = (event) => {
    const selectedGlazing = glazingOptions.find(
      (option) => option.optionName === event.target.value
    );
    setGlazing(selectedGlazing);
  };

  // update 'selectedPackSize' in state if pack size is changed
  const handlePackSizeChange = (event) => {
    const selectedPackSize = packSizeOptions.find(
      (option) => option.priceAdaptation === Number(event.target.value)
    );
    setPackSize(selectedPackSize);
  };

  // create an object with the product's selected options & call 'handleAddToCart' with it
  // this passes the object up to the parent ('Home'/index.js)
  // here it will be added to the 'cart' array
  const addToCart = () => {
    const finalGlazing = glazing;
    const finalPackSize = packSize;
    const finalPrice = Number(price).toFixed(2);

    const newItem = {
      name: itemName,
      image: imageUrl,
      glazing: finalGlazing,
      packSize: finalPackSize,
      price: finalPrice,
    };
    handleAddToCart(newItem);
  };

  return (
    <div className="product-card" id={itemId}>
      {/* display the product's name & image */}
      <img className="product-image" src={imageUrl} alt={imageAlt} />
      <h3>{itemName}</h3>

      <div className="product-options">
        {/* display glazing dropdown */}
        <BaseSelect
          data={glazingOptions}
          label="Glazing"
          name="glazing"
          onChangeHandler={handleGlazingChange}
        />

        {/* display pack size buttons */}
        <BaseRadioButtons
          data={packSizeOptions}
          itemId={itemId}
          label="Pack Size"
          name="pack-size"
          selected={packSize}
          onChangeHandler={handlePackSizeChange}
        />

        {/* display price, which is updated as selections change */}
        <p className="bold" id="Original-price">
          ${price}
        </p>

        {/* attach 'addToCart' function to 'Add to Cart' button as onClick event */}
        <button className="add-to-cart-cta bold" onClick={addToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Item;
