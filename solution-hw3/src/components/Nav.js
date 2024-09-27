import React from "react";
import "../css/nav.css";

const Header = ({ cart }) => {
  const getCartCount = () => {
    return cart.length;
  };

  const getCartTotal = () => {
    return cart
      .reduce((total, item) => total + parseFloat(item.price), 0)
      .toFixed(2);
  };

  const totalItems = getCartCount();
  const totalPrice = getCartTotal();

  return (
    <nav>
      <a id="nav-link-products" href="">
        Products
      </a>
      <div id="cart-div">
        <a id="nav-link-cart" href="">
          Cart
        </a>
        <div id="cart-details">
          <p id="cart-count">{totalItems} Item(s)</p>
          <p id="cart-total">Total: ${totalPrice}</p>
        </div>
      </div>
    </nav>
  );
};

export default Header;
