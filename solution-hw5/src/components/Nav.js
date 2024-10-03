import React from "react";
import "../css/nav.css";

// 'Nav' accepts 1 prop, 'cart'
const Nav = ({ cart, cartTotal, setIsCartOpen }) => {
  // calculate & format cart total
  // const getCartTotal = () => {
  //   return cart
  //     .reduce((total, item) => total + parseFloat(item.price), 0)
  //     .toFixed(2);
  // };

  // const totalPrice = getCartTotal();

  const handleNavClick = (link) => {
    if (link === "cart") {
      setIsCartOpen((prev) => !prev);
    } else {
      setIsCartOpen(false);
    }
  };

  return (
    // 'nav' element contains links ...
    <nav>
      <a id="nav-link-products" onClick={() => handleNavClick("home")}>
        Products
      </a>
      <div id="cart-div">
        <a id="nav-link-cart" onClick={() => handleNavClick("cart")}>
          Cart
        </a>
        {/* ... cart count & cart total */}
        <div id="cart-details">
          <p id="cart-count">{cart.length} Item(s)</p>
          <p id="cart-total">Total: ${cartTotal}</p>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
