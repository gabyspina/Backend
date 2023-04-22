const fs = require('fs');

class productManager {
	#id = 0;
	constructor() {
		this.path = './productos.json';
		this.products = [];
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
		this.products.push(product);
		fs.promises.writeFile(this.path, JSON.stringify(this.products));
	}

	async getProducts() {
		try {
			const actualProducts = await fs.promises.readFile(this.path, 'utf-8');
			return JSON.parse(actualProducts);
		} catch (error) {
			console.log(error);
		}
	}
}
const manager = new productManager();

const test = async () => {
	try {
		manager.addProduct(
			'Producto 1',
			'Descripción 1',
			100,
			'https://www.google.com',
			1,
			10
		);
		manager.addProduct(
			'Producto 2',
			'Descripción 2',
			200,
			'https://www.google.com',
			2,
			20
		);
		console.log(await manager.getProducts());
	} catch (error) {
		console.log(error);
	}
};
test();
