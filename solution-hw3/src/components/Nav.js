import React, { Component } from "react";
import "../css/nav.css";

class Header extends Component {
  getCartCount = () => {
    return this.props.cart.length;
  };

  getCartTotal = () => {
    return this.props.cart
      .reduce((total, item) => total + parseFloat(item.price), 0)
      .toFixed(2);
  };

  render() {
    const totalItems = this.getCartCount();
    const totalPrice = this.getCartTotal();

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
  }
}

export default Header;
