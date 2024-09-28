import React from "react";
import "../css/nav.css";

// 'Nav' accepts 1 prop, 'cart'
const Nav = ({ cart }) => {
  // calculate & format cart total
  const getCartTotal = () => {
    return cart
      .reduce((total, item) => total + parseFloat(item.price), 0)
      .toFixed(2);
  };

  const totalPrice = getCartTotal();

  return (
    // 'nav' element contains links ...
    <nav>
      <a id="nav-link-products" href="/">
        Products
      </a>
      <div id="cart-div">
        <a id="nav-link-cart" href="/">
          Cart
        </a>
        {/* ... cart count & cart total */}
        <div id="cart-details">
          <p id="cart-count">{cart.length} Item(s)</p>
          <p id="cart-total">Total: ${totalPrice}</p>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
