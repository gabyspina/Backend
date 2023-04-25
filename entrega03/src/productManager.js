const fs = require('fs');

export class productManager {
	#id = 0;
	constructor() {
		this.path = './productos.json';
		this.products = [];
		fs.promises.writeFile(this.path, JSON.stringify([]) + '\n');
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
				JSON.stringify([...actualProducts]) + '\n'
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
const manager = new productManager();

setTimeout(() => {}, 1000);

const test = async () => {
	try {
		await manager.addProduct(
			'Producto 1',
			'Descripción 1',
			100,
			'https://www.google.com',
			1,
			10
		);
		await manager.addProduct(
			'Producto 2',
			'Descripción 2',
			200,
			'https://www.google.com',
			2,
			20
		);

		console.log(
			await manager.addProduct(
				'Producto 3',
				'Descripción 3',
				300,
				'https://www.google.com',
				3,
				30
			)
		);
		console.log(await manager.getProducts());

		console.log(await manager.getProductById(0));

		console.log(await manager.updateProduct(0, { title: 'Producto 0' }));

		console.log(await manager.deleteProduct(1, { title: 'Producto 0' }));

		console.log(await manager.getProducts());
	} catch (error) {
		console.log(error);
	}
};
test();
