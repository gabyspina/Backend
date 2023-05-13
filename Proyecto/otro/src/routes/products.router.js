import { Router } from 'express';
import ProductManager from './productManager.js';
const productsRouter = Router();
const productManager = new ProductManager('./products.json');

productsRouter.get('/', (req, res) => {
	const products = productManager.getProducts();
	res.send(products);
	console.log(res.send(products));
});

productsRouter.get('/:id', (req, res) => {
	const productManager = new ProductManager();
	const product = productManager.getProductById(req.params.id);
	res.send(product);
});

productsRouter.post('/', (req, res) => {
	const product = productManager.addProduct(req.body);
	res.send(product);
});

productsRouter.put('/:id', (req, res) => {
	const productManager = new ProductManager();
	const product = productManager.updateProduct(req.params.id, req.body);
	res.send(product);
});

productsRouter.delete('/:id', (req, res) => {
	const productManager = new ProductManager();
	const product = productManager.deleteProduct(req.params.id);
	res.send(product);
});

export { productsRouter };
