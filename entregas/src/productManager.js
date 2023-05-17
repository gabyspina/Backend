import fs from 'fs';
export default class ProductManager {
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

	async getProductById(id) {
		const products = await this.getProducts();
		const product = products.find((product) => product.id === parseInt(id));
		if (!product) {
			console.error('Producto no encontrado.');
			return { status: 'error', message: 'Producto no encontrado.' };
		}
		return product;
	}
	catch(err) {
		console.log(err);
	}

	async updateProduct(id, archivoActualizado) {
		const products = await this.getProducts();
		const indice = products.findIndex((product) => product.id === parseInt(id));
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
				(product) => product.id !== parseInt(id)
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
