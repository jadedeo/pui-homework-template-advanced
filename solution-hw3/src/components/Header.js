import React from "react";
import Nav from "./Nav.js";
import Popup from "./Popup.js";

const Header = ({ cart, popupStatus }) => {
  return (
    <header>
      <div id="header-columns">
        <div id="logo-wrapper">
          <img id="logo" src="../assets/logo/logo-01.svg" alt="bun bun logo" />
        </div>
        <div>
          <Nav cart={cart} />
          <hr />
          <h2 id="slogan">Our hand-made cinnamon rolls</h2>
        </div>
      </div>
      {popupStatus && <Popup lastItem={cart?.slice(-1)[0]} />}
    </header>
  );
};

export default Header;
