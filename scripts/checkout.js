import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadDataFromBackend } from "../data/fromBackend.js";

loadDataFromBackend(function () {
  renderOrderSummary();
  renderPaymentSummary();
})

