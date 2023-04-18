class productManager {
	#id = 0;

	construtor() {
		this.productos = [];
	}

	getProducts() {
		return this.productos;
	}

	addProduct(title, description, price, thumbnail, code, stock) {
		const product = {
			title,
			description,
			price,
			thumbnail,
			code,
			stock,
		};

		product.id = this.#getId();

		this.productos.push(product);
	}

	#getId() {
		const oldId = this.#id;
		this.#id += 1;
		return oldId;
	}

	#getProductsById() {
		this.#id += 1;
		const oldId = this.#id;
		return oldId;
	}
}

//productManager.addProduct('Producto 1', 'Descripcion 1', 100, 'https://www.google.com', 1, 10);
productManager.getProducts();
