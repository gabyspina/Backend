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
	async getProductById(pId) {	
		if (!pId) {
			throw new Error('Falta ID');
		}
		return await this.productModel.findById(pId);
	}

	async updateProduct(pId, product) {
		if (!pId) {
			throw new Error('Falta ID');
		}
		return await this.productModel.updateOne({ _id: pId }, product);
	}

	async deleteProduct(pId) {
		if (!pId) {
			throw new Error('Falta ID');
		}
		return await this.productModel.deleteOne({ _id: pId });
	}
}

export const productService = new ProductService();
