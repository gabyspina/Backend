import { cartModel } from '../models/cart.model.js';
class CartService {
	constructor() {
		this.model = cartModel;
	}

	async addToCart(cart) {
		cart.products = [];
		this.model.create(cart);
	}

	async getAllCarts() {
		const carts = await this.model.find().lean();
		return carts;
	}
}

export const cartService = new CartService();
