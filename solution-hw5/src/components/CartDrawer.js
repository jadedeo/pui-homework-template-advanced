import React, { useState, useEffect } from "react";

import "../css/cartDrawer.css";

const CartDrawer = ({ cart, cartTotal }) => {
  return (
    <div id="cart-drawer">
      <div>
        <p>Shopping Cart ({cart.length} items)</p>
        <p>Total: ${cartTotal}</p>
      </div>
      <div id="cart-item-list">
        {cart.map((item, index) => (
          <div key={index} className="cart-item">
            <img src={item.image} />
            <p>{item.name}</p>
            <p>Glazing: {item.glazing.optionName}</p>
            <p>Pack Size: {item.packSize.optionName}</p>
            <p>
              <strong>${item.price}</strong>
            </p>

            <button class="remove-button">Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CartDrawer;
