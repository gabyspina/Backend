import fs from 'fs';

export default class ProductManager {
	#id = 0;
	constructor() {
		this.path = './src/productos.json';
		this.products = [];
		//		fs.promises.writeFile(this.path, JSON.stringify([]) + '\n');
	}

	#getId() {
		const oldId = this.#id;
		this.#id += 1;
		return oldId;
	}
	async addProduct(title, description, price, thumbnail, code, stock) {
		if (!title || !description || !price || !thumbnail || !code || !stock) {
			console.error('Todos los campos son obligatorios.');
			return;
		}
		const product = {
			id: this.#getId(),
			title,
			description,
			price,
			thumbnail,
			code,
			stock,
		};
		try {
			const actualProducts = await this.getProducts();
			actualProducts.push(product);
			await fs.promises.writeFile(
				this.path,
				JSON.stringify([...actualProducts])
			);
		} catch (err) {
			console.log(err);
		}
	}

	async getProducts() {
		try {
			const actualProducts = await fs.promises.readFile(this.path, 'utf-8');
			return JSON.parse(actualProducts);
		} catch (error) {
			console.log(error);
		}
	}

	async getProductById(id) {
		const products = await this.getProducts();
		const product = products.find((product) => product.id === id);
		if (!product) {
			console.error('Producto no encontrado.');
			return;
		}
		return product;
	}

	async updateProduct(id, archivoActualizado) {
		const products = await this.getProducts();
		const indice = products.findIndex((product) => product.id === id);
		if (indice === -1) {
			console.error('Producto no encontrado.');
			return;
		}
		const product = products[indice];
		const productoModificado = {
 			...product,
			...archivoActualizado,
			id: product.id,
		};
		products[indice] = productoModificado;
		try {
			await fs.promises.writeFile(
				this.path,
				JSON.stringify([...products]) + '\n'
			);
			console.log('Producto actualizado: ', productoModificado);
		} catch (error) {
			console.log(error);
		}
	}

	async deleteProduct(id) {
		try {
			const actualProducts = await this.getProducts();
			const updateProduct = actualProducts.filter(
				(product) => product.id !== id
			);
			await fs.promises.writeFile(
				this.path,
				JSON.stringify([...updateProduct]) + '\n'
			);
			console.log('Producto eliminado');
		} catch (error) {
			console.log(error);
		}
	}
}
