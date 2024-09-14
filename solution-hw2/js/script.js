/**
 * Arrays of obejcts for lazing and pack size options
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
 * Roll class
 */
class Roll {
  constructor(type, basePrice) {
    this.type = type;
    this.glazing = "Keep Original";
    this.packSize = "1";
    this.basePrice = basePrice;
    this.finalPrice = this.basePrice;
  }

  updateGlazing(newGlazing) {
    console.log("updateGlazing", newGlazing);
    this.glazing = newGlazing;
    this.updatePrice();
  }

  updatePackSize(newPackSize) {
    console.log("newPackSize", newPackSize);
    this.packSize = newPackSize;
    this.updatePrice();
  }

  updatePrice() {
    const glazingPrice = glazingOptions.find(
      (g) => g.optionName === this.glazing
    ).priceAdaptation;
    console.log("glazing: +", glazingPrice);

    const packMultiplier = packSizeOptions.find(
      (p) => p.optionName === this.packSize
    ).priceAdaptation;
    console.log("packSize: *", packMultiplier);

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
 * Array of roll objects and cart array
 */
let rolls = [
  new Roll("Original", 2.49),
  new Roll("Apple", 2.49),
  new Roll("Raisin", 2.99),
  new Roll("Walnut", 3.49),
  new Roll("Double-Chocolate", 3.99),
  new Roll("Strawberry", 3.99),
];
let cart = [];

/**
 * Dynamically create glazing dropdown and pack size buttons from constants
 */
function createGlazingSelect() {
  const selects = document.querySelectorAll(".glazing");
  for (const select of selects) {
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
  const packSizeContainers = document.querySelectorAll(".pack-size-container");
  packSizeContainers.forEach((container, containerIndex) => {
    packSizeOptions.forEach((packSize, packSizeIndex) => {
      const radioInput = document.createElement("input");
      radioInput.type = "radio";
      radioInput.id = `prod${containerIndex + 1}-pack${packSize.optionName}`;
      radioInput.name = `prod${containerIndex + 1}-pack`;
      radioInput.value = packSize.priceAdaptation;
      radioInput.hidden = true;

      if (packSize.optionName === "1") {
        radioInput.checked = true;
      }

      const label = document.createElement("label");
      label.htmlFor = radioInput.id;
      label.textContent = packSize.optionName;
      label.className = "pack-btn";

      container.appendChild(radioInput);
      container.appendChild(label);
    });
  });
}

/**
 * Attach event listeners to select options and radio buttons
 */
function attachEventListeners() {
  const glazingSelects = document.querySelectorAll(".glazing");
  const packSizeButtons = document.querySelectorAll("[type='radio']");
  const addToCartButtons = document.querySelectorAll(".add-to-cart-cta");

  glazingSelects.forEach((select, index) => {
    select.addEventListener("change", (event) => {
      const roll = rolls[index];
      roll.updateGlazing(event.target.options[event.target.selectedIndex].text);
      displayUpdatedPrice(roll);
    });
  });

  packSizeButtons.forEach((button) => {
    button.addEventListener("change", (event) => {
      const rollIndex = parseInt(event.target.name.match(/\d+/)[0]) - 1;
      const roll = rolls[rollIndex];
      roll.updatePackSize(event.target.nextSibling.textContent);
      displayUpdatedPrice(roll);
    });
  });

  addToCartButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
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

  console.log("cart:", cart);
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
 * Display popup
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
