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
				return product;
			} else {
				product.id = 1;
				this.products.push(product);
				await fs.promises.writeFile(
					this.path,
					JSON.stringify(this.products, null, '\t')
				);
				return {
					status: 'success',
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
			const productos = fs.readFileSync(this.path, 'utf-8');
			return JSON.parse(productos);
		} catch (err) {
			console.log(err);
		}
	}

	async getProductById(id) {
		try {
			const products = await this.getProducts();
			const product = await products.find((product) => product.id === id);
			return product
				? product
				: '*** No se ha encontrado un producto con el ID indicado';
		} catch (err) {
			console.log(err);
		}
	}

	async deleteProduct(id) {
		try {
			const products = await this.getProducts();
			const product = await products.find((product) => product.id === id);
			if (!product)
				return '*** No se ha encontrado un producto con el ID indicado';
			const newProducts = products.filter((product) => product.id !== id);
			await fs.promises.writeFile(
				this.path,
				JSON.stringify(newProducts, null, '\t')
			);
			return 'Producto eliminado';
		} catch (err) {
			console.log(err);
		}
	}

	async updateProduct(id, product) {
		try {
			const products = await this.getProducts();
			const productToUpdate = await products.find(
				(product) => product.id === id
			);
			if (!productToUpdate)
				return 'No se ha encontrado un producto con el ID indicado';
			const newProducts = products.filter((product) => product.id !== id);
			const updatedProduct = { ...productToUpdate, ...product };
			newProducts.push(updatedProduct);
			await fs.promises.writeFile(
				this.path,
				JSON.stringify(newProducts, null, '\t')
			);
			return updatedProduct;
		} catch (err) {
			console.log(err);
		}
	}
}

export default ProductController;
