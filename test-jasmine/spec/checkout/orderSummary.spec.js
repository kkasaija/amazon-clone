import { renderOrderSummary } from '../../../scripts/checkout/orderSummary.js'
import { loadFromStorage } from '../../../data/cart.js'

describe('Test suite: renderOrderSummary', () => {
  it('displays the cart', () => {
    document.querySelector('.test-container').innerHTML = `
      <div class="order-summary"></div>
    `
    const id = "83d4ca15-0f35-48f5-b7a3-1ea210004f2e"
    //locally control / mock localstorage
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: id,
        quantity: 1,
        deliveryOptionId: "1"
      }])
    })

    loadFromStorage();

    //render mocked data on the page
    renderOrderSummary();

    //check how many items were rendered
    expect(document.querySelectorAll('.cart-item-container').length).toEqual(1)
    expect(document.querySelector(`.js-product-quantity-${id}`).innerText).toContain('Quantity: 1')
  })

  it('deletes a product', () => {
    console.log(document.querySelector('.test-container'))
    document.querySelector('.test-container').innerHTML = `
      <div class="order-summary"></div>
      <div class="payment-summary"></div>
    `
    const id = "83d4ca15-0f35-48f5-b7a3-1ea210004f2e"
    const id2 = "a82c6bac-3067-4e68-a5ba-d827ac0be010"
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{ productId: id, quantity: 1, deliveryOptionId: "1" },
      { productId: id2, quantity: 1, deliveryOptionId: "1" }])
    })

    loadFromStorage();
    renderOrderSummary();

    console.log(document.querySelector(`.delete-quantity-link-${id}`))
    // document.querySelector(`.delete-quantity-link-${id}`).click()
    expect(document.querySelectorAll('.cart-item-container').length).toEqual(2)
  })
})