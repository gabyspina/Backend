import { productModel } from '../models/products.model.js';

class ProductService {
	constructor() {
		this.model = productModel;
	}

	async getAllProductsSinPaginate() {
		return await this.productModel.find().lean();
	}

	async getAllProducts(
		limit = 10,
		page = 1,
		status = undefined,
		category = undefined,
		sort = undefined
	) {
		const filter = {};
		const orderSort = {};

		if (status === 'true') {
			filter.status = true;
		} else if (status === 'false') {
			filter.status = false;
		}

		if (category === 'alimento ') {
			filter.category = 'alimento ';
		}
		if (category === 'accesorios') {
			filter.category = 'accesorios';
		}
		if (category === 'medicacion') {
			filter.category = 'medicacion';
		}
		const queryOptions = {
			lean: true,
			page,
			limit,
			category,
			sort: undefined,
		};

		// Verifica el valor de sort antes de ejecutar return await this.model.paginate(filter, queryOptions)
		if (sort === 'desc') {
			queryOptions.sort = { price: -1 };
		} else if (sort === 'asc') {
			queryOptions.sort = { price: 1 };
		}

		return await this.model.paginate(filter, queryOptions);
	}

	async getProductById(productId) {
		try {
			const product = await this.model.findById(productId);
			if (!product) {
				throw new Error('Producto no encontrado');
			}
			return product;
		} catch (err) {
			console.error(err);
			throw err;
		}
	}

	async addProduct(product) {
		return this.model.create(product);
	}

	async updateProduct(productId, product) {
		return await this.model.updateOne(
			{
				_id: productId,
			},
			product
		);
	}

	async deletePruduct(productId) {
		return await this.model.deleteOne({ _id: productId });
	}
}

export const productService = new ProductService();
