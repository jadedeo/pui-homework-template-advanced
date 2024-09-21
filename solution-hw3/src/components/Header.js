import React, { Component } from "react";
import Nav from "./Nav.js";
import Popup from "./Popup.js";

class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const isPopupVisible = this.props.popupStatus;

    return (
      <header>
        <div id="header-columns">
          <div id="logo-wrapper">
            <img
              id="logo"
              src="../assets/logo/logo-01.svg"
              alt="bun bun logo"
            />
          </div>
          <div>
            <Nav cart={this.props.cart} />
            <hr />
            <h2 id="slogan">Our hand-made cinnamon rolls</h2>
          </div>
        </div>
        {isPopupVisible && <Popup lastItem={this.props.cart?.slice(-1)[0]} />}
      </header>
    );
  }
}

export default Header;
