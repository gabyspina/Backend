import fs from 'fs';

class ProductManager {
    constructor() {
        this.path ='./managers/data/products.json'
        this.products = [];
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

    async getProductById(id) {
        try {
            const products = await this.getProducts();
            const product = await products.find((product) => product.id === id);
            return product ? product : '*** No se ha encontrado un producto con el ID indicado';
        } catch (err) {
            console.log(err);
        }
    }

    async updateProduct(id, update) {
        try {
            const products = await this.getProducts();
            const productIndex = products.findIndex((product) => product.id === id);
            if (productIndex !== -1) {
                products[productIndex] = {
                    id,
                    ...update
                };
                await fs.promises.writeFile(this.path, JSON.stringify(products));
                return products[productIndex];
            }
            return 'No se puede actualizar. No se encuentra el producto con el ID indicado.';
        } catch (err) {
            console.log(err)
        }

    }

    async deleteProduct(id) {
        try {
            const products = await this.getProducts();
            const deletedProduct = products.filter((product) => product.id === id);
            const productIndex = products.findIndex((product) => product.id === id);
            if (productIndex !== -1) {
                const newProducts = products.filter((product) => product.id !== id);
                console.log('Se ha eliminado el siguiente producto:');
                console.log(deletedProduct);
                await fs.promises.writeFile(this.path, JSON.stringify(newProducts));
                return newProducts;
            }
            return '** No se ha podido borrar. No se encuentra producto con el ID indicado.';
        } catch (err) {
            console.log(err)
        }

    }


}

const productsManager = new ProductManager();
export default productsManager;