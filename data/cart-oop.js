// constructor function for the cart object
function Cart(localStorageKey) {
  const cart = {
    cartItems: undefined, //formally cart : undefined (to eliminating naming confusion btn object and  a property)
    loadFromStorage() {
      this.cartItems = JSON.parse(localStorage.getItem(localStorageKey)) || [];
    },

    saveCartToLocalStorage() {
      localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
    },

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
    },

    deleteCartItem(productId) {
      this.cartItems = this.cartItems.filter(
        (cartItem) => cartItem.productId !== productId
      );
      this.saveCartToLocalStorage();
    },

    searchForCartItem(cartItems, id) {
      let item;
      cartItems.forEach((cartItem) => {
        if (id === cartItem.productId) item = cartItem;
      });
      return item;
    },

    updateDeliveryOption(productId, deliveryOptionId) {
      let matchedItem = this.searchForCartItem(this.cartItems, productId);
      matchedItem.deliveryOptionId = deliveryOptionId;
      this.saveCartToLocalStorage();
    },
  };

  return cart;
}

const ordinaryCart = Cart('ordinary-cart');
ordinaryCart.loadFromStorage();
ordinaryCart.addToCart('54e0eccd-8f36-462b-b68a-8182611d9add');
console.log(ordinaryCart);

const businessCart = Cart('business-cart');
businessCart.loadFromStorage();
businessCart.addToCart('54e0eccd-8f36-462');
console.log(businessCart);
