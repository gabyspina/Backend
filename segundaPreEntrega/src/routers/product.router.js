import { Router } from 'express';
import { productService } from '../services/product.services.js';

const productRouter = Router();

productRouter.get('/', async (req, res) => {
	const { limit, page, category, sort } = req.query;
	try {
		const data = await productService.getAllProducts(
			limit,
			page,
			category,
			sort
		);

		data.category = category;
		console.log(data);

		res.status(200).render('products', data);
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
