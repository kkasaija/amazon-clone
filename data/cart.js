//cart.js is a module

export let cart = JSON.parse(localStorage.getItem('cart')) || null;

// export let cart = [
// 	{
// 		productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
// 		quantity: 2,
// 	},
// 	{
// 		productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
// 		quantity: 1,
// 	},
// ];

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
	else cart.push({ productId: id, quantity: 1 });

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
