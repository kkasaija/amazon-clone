//cart.js is a module

export let cart;
loadFromStorage();

export function loadFromStorage(){
  cart = JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCartToLocalStorage() {
	localStorage.setItem("cart", JSON.stringify(cart));
}

export function addToCart(id) {
	let matchedItem = searchForCartItem(cart, id);

	//Quantity of each item in the cart
	if (matchedItem) matchedItem.quantity += 1;
	else cart.push({ productId: id, quantity: 1, deliveryOptionId: "1" });
	saveCartToLocalStorage();
}

export function deleteCartItem(productId) {
	//cart = cart.filter(cartItem => cartItem.productId !== productId)
	const updatedCart = [];
	cart.forEach((cartItem) => {
		if (cartItem.productId !== productId) updatedCart.push(cartItem);
	});

	cart = updatedCart;
	saveCartToLocalStorage();
}

//search for a target item in the cart
function searchForCartItem(cart, id) {
	let item;
	cart.forEach((cartItem) => {
		if (id === cartItem.productId) item = cartItem;
	});
	return item;
}

export function updateDeliveryOption(productId, deliveryOptionId) {
	let matchedItem = searchForCartItem(cart, productId);
	matchedItem.deliveryOptionId = deliveryOptionId;
	saveCartToLocalStorage();
}
