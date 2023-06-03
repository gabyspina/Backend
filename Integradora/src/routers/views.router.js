import { Router } from 'express';
import { productService } from '../services/product.services.js';

const viewsRouter = Router();

viewsRouter.get('/', async (req, res) => {
	try {
		const products = await productService.getAllProducts();
        console.log(products);
		res.render('products', { products });
	} catch (error) {
		res.render('error');
	}
});

export default viewsRouter;
