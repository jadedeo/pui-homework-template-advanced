/**
 * Roll class
 */
class Roll {
  constructor(type, basePrice) {
    this.type = type;
    this.glazing = "Keep Original"; //default
    this.packSize = "1"; //default
    this.basePrice = basePrice;
    this.finalPrice = this.basePrice; //initially basePrice, but will be recalculated with glazing/pack size changes
  }

  updateGlazing(newGlazing) {
    this.glazing = newGlazing;
    this.updatePrice();
  }

  updatePackSize(newPackSize) {
    this.packSize = newPackSize;
    this.updatePrice();
  }

  updatePrice() {
    // find the price adjustment that corresponds to the selected glaze
    const glazingPrice = glazingOptions.find(
      (g) => g.optionName === this.glazing
    ).priceAdaptation;

    // find the price adjustment that corresponds to the selected pack size
    const packMultiplier = packSizeOptions.find(
      (p) => p.optionName === this.packSize
    ).priceAdaptation;

    //calculate final price
    this.finalPrice = (
      (this.basePrice + glazingPrice) *
      packMultiplier
    ).toFixed(2);
  }

  getFinalPrice() {
    return this.finalPrice;
  }
}

/**
 * Arrays of obejcts for glazing and pack size options
 */
const glazingOptions = [
  {
    optionName: "Keep Original",
    priceAdaptation: 0,
  },
  {
    optionName: "Sugar milk",
    priceAdaptation: 0,
  },
  {
    optionName: "Vanilla Milk",
    priceAdaptation: 0.5,
  },
  {
    optionName: "Double chocolate",
    priceAdaptation: 1.5,
  },
];

const packSizeOptions = [
  {
    optionName: "1",
    priceAdaptation: 1,
  },
  {
    optionName: "3",
    priceAdaptation: 3,
  },
  {
    optionName: "6",
    priceAdaptation: 5,
  },
  {
    optionName: "12",
    priceAdaptation: 10,
  },
];

/**
 * Array of roll objects
 */
let rolls = [
  new Roll("Original", 2.49),
  new Roll("Apple", 2.49),
  new Roll("Raisin", 2.99),
  new Roll("Walnut", 3.49),
  new Roll("Double-Chocolate", 3.99),
  new Roll("Strawberry", 3.99),
];

/**
 *  Initially empty cart array
 */
let cart = [];

/**
 * Dynamically create glazing dropdown and pack size buttons from constants
 */
function createGlazingSelect() {
  //select all of the <select> elements meant to hold dropdown items
  const selects = document.querySelectorAll(".glazing");
  for (const select of selects) {
    //within each, create <option>s that correspond to each of the glazing constants
    for (const option of glazingOptions) {
      const newOption = new Option(
        option.optionName,
        option.priceAdaptation.toString()
      );
      select.options.add(newOption);
    }
  }
}

function createPackSizeButtons() {
  //select all of the containers meant to hold pack size buttons
  const packSizeContainers = document.querySelectorAll(".pack-size-container");

  //loop through each of those containers
  packSizeContainers.forEach((container, containerIndex) => {
    //and then loop through the pack size options
    packSizeOptions.forEach((packSize, packSizeIndex) => {
      const radioInput = document.createElement("input");
      radioInput.type = "radio";
      //set up unique ids & names for each radio button dependent on the item/pack size container & pack size option
      radioInput.id = `prod${containerIndex + 1}-pack${packSize.optionName}`;
      radioInput.name = `prod${containerIndex + 1}-pack`;
      radioInput.value = packSize.priceAdaptation;
      radioInput.hidden = true;

      //check all pack size 1s to start with
      if (packSize.optionName === "1") {
        radioInput.checked = true;
      }

      //create & attach labels to each radio button
      const label = document.createElement("label");
      label.htmlFor = radioInput.id;
      label.textContent = packSize.optionName;
      label.className = "pack-btn";

      //add new radio button & corresponding label to container
      container.appendChild(radioInput);
      container.appendChild(label);
    });
  });
}

/**
 * Add event listeners
 */
function attachEventListeners() {
  //select all glazing dropdowns, pack size radio buttons & 'add to cart' buttons
  const glazingSelects = document.querySelectorAll(".glazing");
  const packSizeButtons = document.querySelectorAll("[type='radio']");
  const addToCartButtons = document.querySelectorAll(".add-to-cart-cta");

  glazingSelects.forEach((select, index) => {
    select.addEventListener("change", (event) => {
      //retrieve the roll for which the glazing select was changed
      const roll = rolls[index];
      //update that roll's glazing instance variable with the new selection
      roll.updateGlazing(event.target.options[event.target.selectedIndex].text);

      displayUpdatedPrice(roll);
    });
  });

  packSizeButtons.forEach((button) => {
    button.addEventListener("change", (event) => {
      //since each product has multiple pack size radio buttons, we need to identify which product we're referring to
      const rollIndex = parseInt(event.target.name.match(/\d+/)[0]) - 1;
      //event.target.name will return something like prod4-pack for all pack size radio buttons of product 4
      //we can use .match to extract the 4 (or any sequence of digits) from this name
      //and [0] to access the first match from the returned array

      //retrieve the roll for which the pack size was changed
      const roll = rolls[rollIndex];
      //update that roll's packSize instance variable with the new selection
      roll.updatePackSize(event.target.nextSibling.textContent);

      displayUpdatedPrice(roll);
    });
  });

  addToCartButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      //call addToCart when an 'add to cart' button is clicked
      //pass the index (which represents the roll object/product we're referring to)
      addToCart(index);
    });
  });
}

/**
 * Update price according to final calculated price
 */
function displayUpdatedPrice(roll) {
  const priceElement = document.querySelector(`#${roll.type}-price`);
  priceElement.textContent = `$${roll.getFinalPrice()}`;
}

/**
 * Update cart array when an 'add to cart' button is clicked
 * Update item count & cart total
 */
function addToCart(index) {
  const newItem = rolls[index];
  cart.push(newItem);

  showPopup(newItem);

  const cartCount = document.getElementById("cart-count");
  cartCount.innerHTML = `${cart.length} Item(s)`;

  const cartTotal = document.getElementById("cart-total");
  cartTotal.innerHTML = `Total: $${this.getCartTotal()}`;
}

function getCartTotal() {
  let total = 0;
  for (item of cart) {
    total += parseFloat(item.finalPrice);
  }
  return total.toFixed(2);
}

/**
 * Display popup, filling div with info for the newly added item
 */
function showPopup(newItem) {
  const popup = document.getElementById("popup");

  const popupContent = `
    <div>
        <p>Added to cart:</p>
        <p><strong>${newItem.type} Cinnamon Roll</strong></p>
        <p>${newItem.glazing} glazing</p>
        <p>Pack of ${newItem.packSize}</p>
        <p>Price: $${newItem.finalPrice}</p>
    </div>`;

  popup.innerHTML = popupContent;

  popup.classList.add("show-popup");
  setTimeout(() => {
    popup.classList.remove("show-popup");
    popup.innerHTML = "";
  }, 3000);
}

/**
 * Call functions after DOM has been loaded
 */
document.addEventListener("DOMContentLoaded", function () {
  createGlazingSelect();
  createPackSizeButtons();
  attachEventListeners();
});
