import { cart } from "../data/cart.js";
import { products } from "../data/products.js";
import * as utilsModule from "./utils/money.js";

let cartSummaryHtml = " ";
cart.forEach((cartItem) => {
	const { productId, quantity } = cartItem;

	let matchedProduct;
	products.forEach((product) => {
		if (product.id === productId) {
			matchedProduct = product;
		}
	});

	cartSummaryHtml += `
    <div class="cart-item-container">
      <div class="delivery-date">
        Delivery date: Tuesday, June 21
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image" src="${matchedProduct.image}">

        <div class="cart-item-details">
          <div class="product-name">${matchedProduct.name}</div>
          <div class="product-price">$${utilsModule.formatCurrency(
						matchedProduct.priceCents
					)}</div>

          <div class="product-quantity">
            <span>Quantity: <span class="quantity-label">${quantity}</span></span>
            <span class="update-quantity-link link-primary">Update</span>
            <span class="delete-quantity-link link-primary" data-product-id="${productId}">Delete</span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">Choose a delivery option:</div>

          <div class="delivery-option">
            <input type="radio" checked class="delivery-option-input" name="delivery-option-${
							matchedProduct.id
						}">
            <div>
              <div class="delivery-option-date">Tuesday, June 21</div>
              <div class="delivery-option-price">FREE Shipping</div>
            </div>
          </div>

          <div class="delivery-option">
            <input type="radio" class="delivery-option-input" name="delivery-option-${
							matchedProduct.id
						}">
            <div>
              <div class="delivery-option-date">Wednesday, June 15</div>
              <div class="delivery-option-price">$4.99 - Shipping</div>
            </div>
          </div>

          <div class="delivery-option">
            <input type="radio" class="delivery-option-input" name="delivery-option-${
							matchedProduct.id
						}">
            <div>
              <div class="delivery-option-date">Monday, June 13</div>
              <div class="delivery-option-price">$9.99 - Shipping</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
});

document.querySelector(".order-summary").innerHTML = cartSummaryHtml;

//implement delete button
document.querySelectorAll(".delete-quantity-link").forEach((btn) => {
	btn.addEventListener("click", function(){
    const productId = btn.dataset.productId
  });
});

