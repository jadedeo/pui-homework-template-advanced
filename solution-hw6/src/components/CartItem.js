import React from "react";

const CartItem = ({ item, handleRemoveFromCart }) => {
  // when an item is selected for removal, pass it up to the parent/Home component
  const removeFromCart = (itemToRemove) => {
    handleRemoveFromCart(itemToRemove);
  };

  return (
    <div className="cart-item">
      <img src={item.image} alt={item.name} />
      <p>{item.name}</p>
      <p>Glazing: {item.glazing.optionName}</p>
      <p>Pack Size: {item.packSize.optionName}</p>
      <p>
        <strong>${item.price}</strong>
      </p>
      <button className="remove-button" onClick={() => removeFromCart(item)}>
        Remove
      </button>
    </div>
  );
};

export default CartItem;
