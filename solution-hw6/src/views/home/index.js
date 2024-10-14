import React, { useState, useEffect } from "react";
// import new components & json array of objects for items
import Header from "../../components/Header.js";
import Item from "../../components/Item.js";
import CartDrawer from "../../components/CartDrawer.js";
import SearchSort from "../../components/SearchSort.js";

// import items/product types from json file in 'resources'
import items from "../../resources/items.json";

import "../../css/main.css";

const Home = () => {
  // retrieve cart from localStorage, or create empty array
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );
  // define other state variables & functions for updating them with useState hook
  const [cartTotal, setCartTotal] = useState(Number(0.0).toFixed(2));
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [query, setQuery] = useState("");
  const [sortCriteria, setSortCriteria] = useState("name");
  const [displayedItems, setDisplayedItems] = useState(items);

  // recalculate 'cartTotal' when 'cart' is updated
  useEffect(() => {
    const newTotal = cart
      .reduce((total, item) => total + parseFloat(item.price), 0)
      .toFixed(2);
    setCartTotal(newTotal);

    // since i already have a useEffect that watches for changes to the cart, i can update localStorage with those changes here as well
    localStorage.setItem("cart", JSON.stringify(cart));

    // output cart in localStorage when it is updated
    console.log("Updated Cart -------------- ");
    console.log(JSON.parse(localStorage.getItem("cart")));
  }, [cart]);

  //reevaluate array of displayed items if either search query or sorting criteria is changed
  useEffect(() => {
    // sort items based on selected criteria, creating copy of 'items' so the original is not mutated
    let sortedArray = [...items].sort((a, b) => {
      if (sortCriteria === "name") {
        // compare item names
        return a.itemName.localeCompare(b.itemName);
      } else if (sortCriteria === "basePrice") {
        // compare item base prices
        return a.basePrice - b.basePrice;
      } else return 0;
    });

    // filter the sorted array of items according to presence of 'query' string
    let filteredAndSortedArray = sortedArray.filter((item) => {
      return item.itemName.toLowerCase().includes(query.toLowerCase());
    });

    setDisplayedItems(filteredAndSortedArray);
  }, [query, sortCriteria]);

  // remove specified item from cart (being sure to avoid state mutation)
  const removeFromCart = (itemToRemove) => {
    const newCart = cart.filter((item) => item !== itemToRemove);
    setCart(newCart);
  };

  // add new item to last position in cart array when 'add to cart' button is clicked
  const addToCart = (newItem) => {
    setCart((prevCart) => [...prevCart, newItem]);
    // display popup
    showPopup();
  };

  // ensure popup is visible for only 3 seconds after being triggered
  const showPopup = () => {
    setIsPopupVisible(true);
    setTimeout(() => {
      setIsPopupVisible(false);
    }, 3000);
  };

  // only set 'query' after the 'search' button has been clicked
  const executeSearch = () => {
    setQuery(searchInput);
  };

  return (
    <div>
      {/* pass 'cart', 'cartTotal' & the visibility of the popup to the 'Header' component */}
      <Header
        cart={cart}
        cartTotal={cartTotal}
        popupStatus={isPopupVisible}
        setIsCartOpen={setIsCartOpen}
      />

      {/* only render 'CartDrawer' according to boolean value in 'isCartOpen' */}
      {isCartOpen && (
        <CartDrawer
          cart={cart}
          cartTotal={cartTotal}
          handleRemoveFromCart={removeFromCart}
        />
      )}

      {/* Component that includes the search input & sort dropdown */}
      <SearchSort
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        sortCriteria={sortCriteria}
        setSortCriteria={setSortCriteria}
        executeSearch={executeSearch}
      />

      <main>
        {displayedItems.length > 0 ? (
          <div id="product-gallery">
            {displayedItems.map((item) => (
              <Item
                key={item.itemId}
                itemId={item.itemId}
                imageUrl={item.imageURL}
                imageAlt={item.imageAlt}
                itemName={item.itemName}
                basePrice={item.basePrice}
                handleAddToCart={addToCart}
              />
            ))}
          </div>
        ) : (
          <p>No match!</p>
        )}
      </main>
    </div>
  );
};

export default Home;
