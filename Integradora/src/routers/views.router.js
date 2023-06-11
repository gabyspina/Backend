import { Router } from 'express';
import { productService } from '../services/product.services.js';
import { chatService } from '../services/chat.services.js';

const viewsRouter = Router();

viewsRouter.get('/', async (req, res) => {
	try {
		const products = await productService.getAllProducts();

		res.render('products', { products });
	} catch (error) {
		res.render('error');
	}
});

viewsRouter.get('/api/chat', async (req, res) => {
	try {
		const messages = await chatService.getAllMessages();

		res.render('chat', { messages });
	} catch (error) {
		res.render('error');
	}
});

export default viewsRouter;
