import { cart } from "../../data/cart.js";
import { getProduct } from "../../data/fromBackend.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { formatCurrency } from "../utils/money.js";

export function renderPaymentSummary() {
	let totalProductCost = 0;
	let totalShippingCost = 0;
	let quantity = 0;
	cart.forEach((cartItem) => {
		const product = getProduct(cartItem.productId);
		quantity += cartItem.quantity;
		//get delivery option
		const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
		//total cost of items in the cart
		totalProductCost += product.priceCents * cartItem.quantity;
		totalShippingCost += deliveryOption.priceCents;
	});

  document.querySelector('.return-to-home-link').innerHTML = `${quantity} items`

	const totalBeforeTax = totalProductCost + totalShippingCost;

	//10% tax
	const taxCents = totalBeforeTax / 10;
	const tocalCostCents = totalBeforeTax + taxCents;

	const paymentSummaryHtml = `
    <div class="payment-summary-title">
      Order Summary
    </div>

    <div class="payment-summary-row">
      <div>Items (${quantity}):</div>
      <div class="payment-summary-money">$${formatCurrency(
				totalProductCost
			)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money">$${formatCurrency(
				totalShippingCost
			)}</div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">$${formatCurrency(
				totalBeforeTax
			)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money">
      $${formatCurrency(tocalCostCents)}</div>
    </div>

    <button class="place-order-button button-primary">
      Place your order
    </button>
  `;

	document.querySelector(".payment-summary").innerHTML = paymentSummaryHtml;
}
