import { addToCart, cart, loadFromStorage } from "../../../data/cart.js";

describe('Test suite: addToCart', () => {
  it('adds an existing product to cart: ', () => {
    const productId = '83d4ca15-0f35-48f5-b7a3-1ea210004f2e';
    spyOn(localStorage, 'setItem');
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
        quantity: 1,
        deliveryOptionId: "1"
      }])
    })

    loadFromStorage()
    addToCart(productId);
    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual(productId);
    expect(cart[0].quantity).toEqual(2)
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);

  });

  it('adds a new product to cart: ', () => {
    const productId = '83d4ca15-0f35-48f5-b7a3-1ea210004f2e';

    //mock local storage using spyon
    //mocks are intended to seperate tests from application
    spyOn(localStorage, 'setItem');
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([])
    })

    //reload localstorage to ensure cart is empty
    loadFromStorage();
    addToCart(productId);
    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual(productId);
    expect(cart[0].quantity).toEqual(1)
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  });
})
