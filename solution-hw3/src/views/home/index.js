import React, { useState, useEffect } from "react";
import Header from "../../components/Header.js";
import Item from "../../components/Item.js";
import items from "../../resources/items.json";
import "../../css/main.css";

const Home = () => {
  const [cart, setCart] = useState([]);
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  useEffect(() => {
    if (cart.length > 0) {
      showPopup();
    }
  }, [cart]);

  const handleAddToCart = (newItem) => {
    setCart((prevCart) => [...prevCart, newItem]);
  };

  const showPopup = () => {
    setIsPopupVisible(true);
    setTimeout(() => {
      setIsPopupVisible(false);
    }, 3000);
  };

  return (
    <div>
      <Header cart={cart} popupStatus={isPopupVisible} />
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
              sendDataToParent={handleAddToCart}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;
