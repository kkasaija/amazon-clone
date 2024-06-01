//cart.js is a module

export const cart = [];

export function addToCart(id) {
  let matchedItem;
  cart.forEach(cartItem => {
    if (id === cartItem.productId) matchedItem = cartItem
  })

  //Quantity of each item in the cart
  if (matchedItem) matchedItem.quantity += 1
  else cart.push({ id, quantity: 1 })
}
