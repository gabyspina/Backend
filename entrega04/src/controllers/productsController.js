import fs from 'fs';

class ProductController {
    #id = 0;
	constructor() {
		this.path = './src/products.json';
		this.products = [];
	}

	async addProduct(product) {
		if ( 
			!product.title ||
			!product.description ||
			!product.price ||
			!product.thumbnail ||
			!product.code ||
			!product.stock ||
			!product.category
		)
			return {
				status: 'error',
				message: 'Todos los campos son obligatorios.',
			};
		try {
			if (fs.existsSync(this.path)) {
				const data = await fs.promises.readFile(this.path, 'utf-8');
				this.products = JSON.parse(data);
				let id = this.products[this.products.length - 1].id + 1;
				product.id = id;
				this.products.push(product);
				await fs.promises.writeFile(
					this.path,
					JSON.stringify(this.products, null, '\t')
				);
				return {
					status: 'success',
					message: 'Producto agregado',
				};
			} else {
				product.id = 1;
				this.products.push(product);
				await fs.promises.writeFile(
					this.path,
					JSON.stringify(this.products, null, '\t')
				);
				return {
					console: 'success',
					message: 'Producto agregado',
				};
			}
		} catch (error) {
			console.log(error);
			return {
				status: 'error',
				message: 'No se pudo agregar el producto',
			};
		}
	}

	async getProducts() {
		try {
			const data = await fs.promises.readFile(this.path, 'utf-8');
			return JSON.parse(data);
		} catch (error) {
			console.log(error);
			return;
		}
	}

}

export default ProductController;
