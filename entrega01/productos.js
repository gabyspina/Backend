class ProductManager {
	#id = 0;

	constructor() {
		this.products = [];
	}

	getProducts() {
		return this.products;
	}

	addProduct(title, description, price, thumbnail, code, stock) {
		if (!title || !description || !price || !thumbnail || !code || !stock) {
			console.error('Todos los campos son obligatorios.');
			return;
		}

		if (this.products.some((product) => product.code === code)) {
			console.error('Ya existe un producto con el mismo código.');
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
	}

	#getId() {
		const oldId = this.#id;
		this.#id += 1;
		return oldId;
	}

	getProductById(id) {
		const product = this.products.find((p) => p.id === id);

		if (!product) {
			console.error('Producto no encontrado.');
			return null;
		}

		return product;
	}
}

const manager = new ProductManager();

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

console.log(manager.getProducts());

console.log(manager.getProductById(0));

console.log(manager.getProductById(1));
