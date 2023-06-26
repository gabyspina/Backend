import { Router } from 'express';
import { productService } from '../services/product.services.js';

const viewsRouter = Router();

viewsRouter.get('/', async (req, res) => {
	try {
		const { limit, page } = req.query;
		const data = await productService.getAllProducts(limit, page);
		res.render('products', data);
	} catch (error) {
		res.render('error');
	}	
});
	
viewsRouter.get('/cookies', (req, res) => {
	res.render('cookies');
});


export default viewsRouter;
