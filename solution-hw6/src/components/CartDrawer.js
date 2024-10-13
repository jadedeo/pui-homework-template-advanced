import React from "react";
import "../css/cartDrawer.css";

/** 'CartDrawer' component accepts the following props to create a drawer containing the current cart:
 * cart: array of items in cart
 * cartTotal: the total cost of items currently in the cart
 * handleRemoveFromCart: function that lifts the item to be removed to the parent component
 */
const CartDrawer = ({ cart, cartTotal, handleRemoveFromCart }) => {
  // when an item is selected for removal, pass it up to the parent/Home component
  const removeFromCart = (itemToRemove) => {
    handleRemoveFromCart(itemToRemove);
  };

  return (
    <div id="cart-drawer">
      <div id="cart-drawer-header">
        {/* display cart count and total */}
        <h3>
          Shopping Cart ({cart.length}{" "}
          {cart.length > 1 || cart.length === 0 ? "items" : "item"})
        </h3>
        <h3>Total: ${cartTotal}</h3>
      </div>
      <div id="cart-item-list">
        {/* if 'cart' contains more than 0 items */}
        {cart.length > 0 ? (
          // iterate through array and display items currently in 'cart'
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
          // if 'cart' contains 0 items, display this message
          <p>The cart is empty!</p>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
