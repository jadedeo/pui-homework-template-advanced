import React from "react";

// 'Popup' component accepts the item in the last position of the 'cart' array
const Popup = ({ lastItem }) => {
  return (
    <>
      {/* conditionally render to account for the edge case of the only item in the cart being removed while the popup is still open */}
      {lastItem && (
        <div id="popup">
          <p>Added to cart:</p>
          <div id="popup-item-content">
            {/* the info associate with the item is shown in the popup */}
            <p>
              <strong>{lastItem.name}</strong>
            </p>
            <p>{lastItem.glazing.optionName} glazing</p>
            <p>Pack of {lastItem.packSize.optionName}</p>
            <p>Price: ${lastItem.price}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Popup;
