import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadDataFromBackend } from "../data/fromBackend.js";

// loadDataFromBackend(function () {
//   renderOrderSummary();
//   renderPaymentSummary();
// })


//using promises
// new Promise((resolve) => {
//   loadDataFromBackend(function () {
//     resolve()//go to next step if loadDataFromBackend has finished execution
//   })
// }).then(function () {
//   renderOrderSummary();
//   renderPaymentSummary();
// })

loadDataFromBackend().then(function () {
  renderOrderSummary();
  renderPaymentSummary();
})
