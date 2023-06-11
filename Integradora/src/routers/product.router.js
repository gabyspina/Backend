import { Router } from 'express';
import { productService } from '../services/product.services.js';

const productRouter = Router();

productRouter.get('/', async (req, res) => {
	try {
		const products = await productService.getAllProducts();
		res.send(products);
	} catch (error) {
		res.status(500).send(error);
	}
});

productRouter.post('/', async (req, res) => {
	const product = req.body;
	try {
		const newProduct = await productService.addProduct(product);
		io.emit('newProduct', newProduct);
		res.send(newProduct);
	} catch (error) {
		res.status(500).send(error);
	}
});

export default productRouter;
