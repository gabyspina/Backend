import { Router } from 'express';
import ProductManager from '../productManager.js';
const productsRouter = Router();
const productManager = new ProductManager();

productsRouter.get('/', async (req, res) => {
	const products = await productManager.getProducts();
	console.log(products);
	res.send(products);
});

productsRouter.get('/:id', async (req, res) => {
	const productManager = new ProductManager();
	const product = await productManager.getProductById(req.params.id);
	res.send(product);
});

productsRouter.post('/', async (req, res) => {
	const product = await productManager.addProduct(req.body);
	res.send(product);
});

productsRouter.put('/:id', async (req, res) => {
	const productManager = new ProductManager();
	const product = await productManager.updateProduct(req.params.id, req.body);
	res.send(product);
});

productsRouter.delete('/:id', async (req, res) => {
	const productManager = new ProductManager();
	const product = await productManager.deleteProduct(req.params.id);
	res.send(product);
});

export { productsRouter };
