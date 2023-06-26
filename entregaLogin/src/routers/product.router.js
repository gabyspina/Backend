import { Router } from 'express';
import { productService } from '../services/product.services.js';

const productRouter = Router();

productRouter.get('/', async (req, res) => {
	const { limit, page, sort } = req.query;
	try {
		const products = await productService.getAllProducts(
			limit,
			page,
			query,
			sort
		);
		console.log(products);

		res.status(200).render('products', products);
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
 