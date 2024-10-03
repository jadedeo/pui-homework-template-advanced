import React, { useState, useEffect } from "react";
// import new components & json array of objects for items
import Header from "../../components/Header.js";
import Item from "../../components/Item.js";
import CartDrawer from "../../components/CartDrawer.js";

// import items/product types from json file in 'resources'
import items from "../../resources/items.json";

import "../../css/main.css";

const Home = () => {
  // define state variables & functions for updating them with useState hook
  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(Number(0.0).toFixed(2));
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // if 'cart' is updated & there is at least one item in 'cart', show popup
  useEffect(() => {
    if (cart.length > 0) {
      showPopup();
    }
  }, [cart]);

  //add new item to last position in cart array when 'add to cart' button is clicked
  const addToCart = (newItem) => {
    setCart((prevCart) => [...prevCart, newItem]);
  };

  // recalculate 'cartTotal' when 'cart' is updated
  useEffect(() => {
    const newTotal = cart
      .reduce((total, item) => total + parseFloat(item.price), 0)
      .toFixed(2);
    setCartTotal(newTotal);
  }, [cart]);

  // ensure popup is visible for only 3 seconds after being triggered
  const showPopup = () => {
    setIsPopupVisible(true);
    setTimeout(() => {
      setIsPopupVisible(false);
    }, 3000);
  };

  return (
    <div>
      {/* pass the visibility of the popup to the 'Header' component */}
      <Header
        cart={cart}
        cartTotal={cartTotal}
        popupStatus={isPopupVisible}
        setIsCartOpen={setIsCartOpen}
      />

      {isCartOpen && <CartDrawer cart={cart} cartTotal={cartTotal} />}

      {/* SEARCH & SORT */}
      <div id="search-sort">
        <div>
          <input />
          <button>Search</button>
        </div>

        <div>
          <label>Sort by:</label>
          <select>
            <option>Name</option>
            <option>Base Price</option>
          </select>
        </div>
      </div>

      <main>
        <div id="product-gallery">
          {/* iterate over imported array of items, creating a new 'Item' for each*/}
          {items.map((item, index) => (
            <Item
              key={index}
              itemId={item.itemId}
              imageUrl={item.imageURL}
              imageAlt={item.imageAlt}
              itemName={item.itemName}
              basePrice={item.basePrice}
              handleAddToCart={addToCart}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;
