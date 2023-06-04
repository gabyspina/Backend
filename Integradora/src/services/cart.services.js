import { cartModel } from '../models/cart.model.js';
import { productService } from './product.services.js';
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

	async addProductToCart(cartId, productId) {
		const cart = await this.model.findOne({ _id: cartId });
		const product = await productService.getProductById(productId);
		cart.products.push(product);

		return await cart.save();
	}
}

export const cartService = new CartService();
