import React from "react";
import Nav from "./Nav.js";
import Popup from "./Popup.js";

// 'Header' accepts 2 props, cart & popupStatus
const Header = ({ cart, cartTotal, popupStatus, setIsCartOpen }) => {
  return (
    // 'header' element contains ...
    <header>
      <div id="header-columns">
        <div id="logo-wrapper">
          <img id="logo" src="../assets/logo/logo-01.svg" alt="bun bun logo" />
        </div>
        <div>
          {/* ... 'Nav' component (which accepts the 'cart' array) ... */}
          <Nav
            cart={cart}
            setIsCartOpen={setIsCartOpen}
            cartTotal={cartTotal}
          />
          <hr />
          <h2 id="slogan">Our hand-made cinnamon rolls</h2>
          <p>{popupStatus}</p>
        </div>
      </div>

      {/*  ... and 'Popup' component (which accepts the item at the last position in the cart) */}

      {popupStatus && <Popup lastItem={cart?.slice(-1)[0]} />}
    </header>
  );
};

export default Header;
