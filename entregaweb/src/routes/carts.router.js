import { Router } from 'express';
import CartManager from '../../cartManager.js';

const cartsRouter = Router();
const cartManager = new CartManager();

// Obtiene todos los carritos
cartsRouter.get('/', async (req, res) => {
	try {
		res.send(await cartManager.getCarts());
	} catch (err) {
		console.log(err);
	}
});

// Crea un nuevo carrito
cartsRouter.post('/', async (req, res) => {
	try {
		res.status(201).send(await cartManager.newCart());
	} catch (err) {
		console.log(err);
	}
});

// req.params: permite buscar un carrito por su ID para ver los productos que contiene. EJ: http://localhost:8080/api/carts/2
cartsRouter.get('/:cid', async (req, res) => {
	try {
		const cartById = await cartManager.getCartByID(parseInt(req.params.cid));
		res.status(201).send(await cartById);
	} catch (err) {
		console.log(err);
	}
});

// Agrega un producto al carrito. Recibe como parametro id del carrio (cid) y el id del producto (pid)
cartsRouter.post('/:cid/product/:pid', async (req, res) => {
	try {
		const newProduct = await cartManager.addToCart(
			parseInt(req.params.cid),
			parseInt(req.params.pid)
		);
		return res.status(201).send(await newProduct);
	} catch (err) {
		console.log(err);
	}
});

export { cartsRouter };
