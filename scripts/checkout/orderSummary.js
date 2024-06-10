import dayjs from "https://unpkg.com/dayjs@1.11.11/esm/index.js";
import { cart, deleteCartItem, updateDeliveryOption } from "../../data/cart.js";
import { getProduct } from "../../data/fromBackend.js";
import { formatCurrency } from "../utils/money.js";
import { getDeliveryOption, deliveryOptions } from "../../data/deliveryOptions.js";
import { renderPaymentSummary } from "./paymentSummary.js";

export function renderOrderSummary() {
  let cartSummaryHtml = " ";
  cart.forEach((cartItem) => {
    const matchedProduct = getProduct(cartItem.productId);
    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId)

    const dateString = deliverBy(
      deliveryOption.deliveryDays,
      "days",
      "D MMM YYYY"
    );

    cartSummaryHtml += `
    <div
      class="cart-item-container 
      cart-item-container-${matchedProduct.id}">
      <div class="delivery-date">
        Delivery date: ${dateString}
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image" src="./${matchedProduct.image}">

        <div class="cart-item-details">
          <div class="product-name">${matchedProduct.name}</div>
          <div class="product-price">
            ${matchedProduct.getPrice()}
          </div>

          <div class="product-quantity js-product-quantity-${matchedProduct.id}">
            <span>
              Quantity: <span class="quantity-label">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary">
              Update
            </span>
            <span 
              class="delete-quantity-link link-primary
              delete-quantity-link-${cartItem.productId}
              " 
              data-product-id="${cartItem.productId}">
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">Choose a delivery option:</div>
          ${deliveryOptionsHTML(matchedProduct, cartItem)}
        </div>
      </div>
    </div>
  `;
  });

  document.querySelector(".order-summary").innerHTML = cartSummaryHtml;

  //display nothing if cart is empty
  function hideCheckOutHTML(){
    const mainContainer = document.querySelector('.main')
    if (!cart.length) mainContainer.style.display = 'none'
  }

  hideCheckOutHTML()

  //implement delete button
  document.querySelectorAll(".delete-quantity-link").forEach((btn) => {
    btn.addEventListener("click", function () {
      const productId = btn.dataset.productId;

      //update the cart
      deleteCartItem(productId);

      //remove the item from the dom
      document.querySelector(`.cart-item-container-${productId}`).remove();
      hideCheckOutHTML()
      renderPaymentSummary();
    });
  });

  //deliveryOptions HTML
  function deliveryOptionsHTML(matchedProduct, cartItem) {
    let html = "";
    deliveryOptions.forEach((deliveryOption) => {
      const isChecked = cartItem.deliveryOptionId === deliveryOption.id;

      const dateString = deliverBy(
        deliveryOption.deliveryDays,
        "days",
        "ddd, D MMM YYYY"
      );
      const priceString =
        deliveryOption.priceCents === 0
          ? "Free"
          : `$${formatCurrency(deliveryOption.priceCents)}`;

      html += `
      <div class="delivery-option" 
        data-product-id="${matchedProduct.id}" 
        data-delivery-option-id="${deliveryOption.id}">
        <input 
          type="radio"
          ${isChecked ? "checked" : ""}
          class="delivery-option-input" 
          name="delivery-option-${matchedProduct.id}">
        <div>
          <div 
            class="delivery-option-date">${dateString}
          </div>
          <div 
            class="delivery-option-price">${priceString} - Shipping
          </div>
        </div>
      </div>
    `;
    });

    return html;
  }

  //Add event listeners to radio buttons
  document.querySelectorAll(".delivery-option").forEach((element) => {
    element.addEventListener("click", () => {
      const { productId, deliveryOptionId } = element.dataset;
      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary();
      renderPaymentSummary();
    });
  });

  //delivery date
  function deliverBy() {
    const [dayCount, durationStr, dateString] = arguments;
    const today = dayjs();
    const deliveryDate = today.add(dayCount, durationStr);
    return deliveryDate.format(dateString);
  }
}
