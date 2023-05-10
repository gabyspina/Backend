import { Router } from 'express';
import CartManager from '../cartManager.js';

const cartsRouter = Router();

cartsRouter.get('/', (req, res) => {
	const cartsManager = new CartManager();
	const products = cartsManager.getProducts();
	res.send(products);
});

cartsRouter.get('/:id', (req, res) => {
	const cartsManager = new CartManager();
	const product = cartsManager.getProductById(req.params.id);
	res.send(product);
});

cartsRouter.post('/', (req, res) => {
	const cartsManager = new CartManager();
	const product = cartsManager.addProduct(req.body);
	res.send(product);
});

cartsRouter.put('/:id', (req, res) => {
	const cartsManager = new ProductManager();
	const product = cartsManager.updateProduct(req.params.id, req.body);
	res.send(product);
});

cartsRouter.delete('/:id', (req, res) => {
	const cartsManager = new ProductManager();
	const product = cartsManager.deleteProduct(req.params.id);
	res.send(product);
});

export { cartsRouter };
