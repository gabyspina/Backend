import { productModel } from '../models/product.model.js';

class ProductService {
	constructor() {
		this.productModel = productModel;
	}

	async getAllProducts() {
		return await this.productModel.find().lean();
	}

	async addProduct(product) {
		return await this.productModel.create(product);
	}
	async getProductById(pid) {
		if (!pid) {
			throw new Error('Falta ID');
		}
		return await this.productModel.findById(pid);
	}

	async updateProduct(pid, product) {
		if (!pid) {
			throw new Error('Falta ID');
		}
		return await this.productModel.updateOne({ _id: pid }, product);
	}

	async deleteProduct(pid) {
		if (!pid) {
			throw new Error('Falta ID');
		}
		return await this.productModel.deleteOne({ _id: pid });
	}
}

export const productService = new ProductService();
