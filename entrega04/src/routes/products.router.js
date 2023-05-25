import { Router } from 'express';
import ProductController from '../controllers/productsController.js';

const productRouter = Router();
const productController = new ProductController();

productRouter.post('/', async (req, res) => {
	const product = req.body;
	const productController = new ProductController();
	const result = await productController.addProduct(product);
	res.json(result);
});

productRouter.get('/', async (req, res) => {
	try {
		const products = await productController.getProducts();
		const limit = req.query.limit;
		!limit ? res.send(products) : res.send(products.slice(0, limit));
	} catch (error) {
		console.log(error);
	}
});

productRouter.get('/:pid', async (req, res) => {
	try {
		let productId = await productController.getProductById(
			parseInt(req.params.pid)
		);
		res.status(201).send(productId);
	} catch (error) {
		console.log(error);
	}
});

productRouter.delete('/:pid', async (req, res) => {
	try {
		productController.deleteProduct(parseInt(req.params.pid));
		res.status(201).send('Producto eliminado');
	} catch (error) {
		console.log(error);
	}
});

productRouter.put('/:pid', async (req, res) => {
	try {
		const product = req.body;
		const productId = parseInt(req.params.pid);
		const updatedProduct = await productController.updateProduct(
			productId,
			product
		);
		res.status(201).send(updatedProduct);
	} catch (error) {
		console.log(error);
	}
});

export default productRouter;
