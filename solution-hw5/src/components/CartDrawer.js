import React from "react";

import "../css/cartDrawer.css";

const CartDrawer = ({ cart, cartTotal, handleRemoveFromCart }) => {
  const removeFromCart = (itemToRemove) => {
    handleRemoveFromCart(itemToRemove);
  };

  return (
    <div id="cart-drawer">
      <div id="cart-drawer-header">
        <h3>Shopping Cart ({cart.length} items)</h3>
        <h3>Total: ${cartTotal}</h3>
      </div>
      <div id="cart-item-list">
        {cart.length > 0 ? (
          cart.map((item, index) => (
            <div key={index} className="cart-item">
              <img src={item.image} alt={item.name} />
              <p>{item.name}</p>
              <p>Glazing: {item.glazing.optionName}</p>
              <p>Pack Size: {item.packSize.optionName}</p>
              <p>
                <strong>${item.price}</strong>
              </p>
              <button
                className="remove-button"
                onClick={() => removeFromCart(item)}
              >
                Remove
              </button>
            </div>
          ))
        ) : (
          <p>The cart is empty!</p>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
