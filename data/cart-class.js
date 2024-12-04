class Cart {
  cartItems;

  #localStorageKey; //private property since it starts with # symbol

  constructor(localStorageKey) {
    //accessing a private property
    this.#localStorageKey = localStorageKey;

    //accessing private method
    this.#loadFromStorage();
  }

  //private method
  #loadFromStorage() {
    this.cartItems =
      JSON.parse(localStorage.getItem(this.#localStorageKey)) || [];
  }

  saveCartToLocalStorage() {
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
  }

  addToCart(id) {
    let matchedItem = this.searchForCartItem(this.cartItems, id);
    //Quantity of each item in the cart
    if (matchedItem) matchedItem.quantity += 1;
    else
      this.cartItems.push({
        productId: id,
        quantity: 1,
        deliveryOptionId: '1',
      });
    this.saveCartToLocalStorage();
  }

  deleteCartItem(productId) {
    this.cartItems = this.cartItems.filter(
      (cartItem) => cartItem.productId !== productId
    );
    this.saveCartToLocalStorage();
  }

  searchForCartItem(cartItems, id) {
    let item;
    cartItems.forEach((cartItem) => {
      if (id === cartItem.productId) item = cartItem;
    });
    return item;
  }

  updateDeliveryOption(productId, deliveryOptionId) {
    let matchedItem = this.searchForCartItem(this.cartItems, productId);
    matchedItem.deliveryOptionId = deliveryOptionId;
    this.saveCartToLocalStorage();
  }
}

const cartOrdinary = new Cart('ordinary-cart');
const cartBusiness = new Cart('business-cart');

console.log(cartOrdinary);
console.log(cartBusiness);
