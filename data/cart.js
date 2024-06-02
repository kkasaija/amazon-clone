//cart.js is a module

export let cart = JSON.parse(localStorage.getItem('cart')) || [];

function saveCartToLocalStorage() {
	localStorage.setItem("cart", JSON.stringify(cart));
}

export function addToCart(id) {
	let matchedItem;
	cart.forEach((cartItem) => {
		if (id === cartItem.productId) matchedItem = cartItem;
	});

	//Quantity of each item in the cart
	if (matchedItem) matchedItem.quantity += 1;
	else cart.push({ productId: id, quantity: 1, deliveryOptionId: '1' });
	saveCartToLocalStorage();
}

export function deleteCartItem(productId) {
	//cart = cart.filter(cartItem => cartItem.productId !== productId)
	const updatedCart = [];
	cart.forEach((cartItem) => {
		if (cartItem.productId !== productId) updatedCart.push(cartItem);
	});

	cart = updatedCart;
  saveCartToLocalStorage()
}
