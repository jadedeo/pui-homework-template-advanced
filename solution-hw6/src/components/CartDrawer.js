import React from "react";
import CartItem from "./CartItem";
import "../css/cartDrawer.css";

/** 'CartDrawer' component accepts the following props to create a drawer containing the current cart:
 * cart: array of items in cart
 * cartTotal: the total cost of items currently in the cart
 * handleRemoveFromCart: function that lifts the item to be removed to the parent component
 */
const CartDrawer = ({ cart, cartTotal, handleRemoveFromCart }) => {
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
          // iterate through array and display items currently in 'cart' using CartItem component
          cart.map((item, index) => (
            <CartItem
              key={index}
              item={item}
              handleRemoveFromCart={handleRemoveFromCart}
            />
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
