import { cartModel } from '../models/cart.model';

class CartService {
	constructor() {
		this.cartModel = [];
	}

	async addToCart(cart) {
		cart.products = [];
		const acrt = await this.cartModel.create(cart);
	}

	async getCart() {
		const cart = await this.cartModel.find().lean();
	}
}

export const cartService = new CartService();
