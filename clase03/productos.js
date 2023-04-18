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

        product.id = this.#getProductsById

        this.productos.push(product)
	}

	#getProductsById() {
		const oldId = this.#id;
		this.#id += 1;
		return oldId;
	}

		

}
