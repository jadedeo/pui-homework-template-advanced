import React, { Component } from "react";
import Header from "../../components/Header.js";
import Item from "../../components/Item.js";
import items from "../../resources/items.json";
import "../../css/main.css";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
      isPopupVisible: false,
    };
  }

  handleAddToCart = (newItem) => {
    this.setState(
      (prevState) => ({
        cart: [...prevState.cart, newItem],
      }),
      () => {
        this.showPopup(newItem);
      }
    );
  };

  showPopup = (newItem) => {
    this.setState({ isPopupVisible: true });
    setTimeout(() => {
      this.setState({ isPopupVisible: false });
    }, 3000);
  };

  render() {
    return (
      <div>
        <Header
          cart={this.state.cart}
          popupStatus={this.state.isPopupVisible}
        />
        <main>
          <div id="product-gallery">
            {items.map((item, index) => (
              <Item
                key={index}
                itemId={item.itemId}
                imageUrl={item.imageURL}
                imageAlt={item.imageAlt}
                itemName={item.itemName}
                basePrice={item.basePrice}
                sendDataToParent={this.handleAddToCart}
              />
            ))}
          </div>
        </main>
      </div>
    );
  }
}

export default Home;
