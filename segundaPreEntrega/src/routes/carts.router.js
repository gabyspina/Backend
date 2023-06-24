import { Router } from "express";
import cartService from "../services/cart.servise.js";

const cartRouter = Router();


cartRouter.get('/', async (req, res) => {
    try {
        const carts = await cartService.getAllCarts();
        res.status(201).send(carts);
    } catch(err) {
        res.status(500).send(err);
    }
})

cartRouter.get('/:cartId', async (req, res) => {
    const cartId = req.params.cartId;
    try {
        const cart = await cartService.getCartById(cartId);
        res.status(201).send(cart);
    } catch(err) {
        res.status(500).send(err);
    }
})

cartRouter.post('/', async (req, res) => {
    try {
        const newCart = await cartService.addCart();
        res.status(201).send(newCart);
    } catch(err) {
        res.status(500).send(err);
    }
})

cartRouter.post('/:cartId/:productId', async (req, res) => {
    const quantity = req.body.quantity;
    const cartId = req.params.cartId;
    const productId =req.params.productId;
    try {
        const addedProduct = await cartService.addProductToCart(cartId, productId, quantity);
        res.status(201).send(addedProduct);
    } catch(err) {
        res.status(500).send(err)
    }
})

cartRouter.delete('/:cartId/:productId', async (req, res) => {
    const {cartId, productId} = req.params
    try {
        const deleteProduct = await cartService.deleteProductFromCart(cartId, productId)
        res.status(201).send(deleteProduct);
    } catch(err) {
        res.status(500).send(err)
    }
})

cartRouter.delete('/:cartId', async (req, res) => {
    const cartId = req.params.cartId
    try {
        await cartService.emptyCart(cartId);
        res.status(204).send(cartId)
    } catch(err) {
        res.status(500).send(err);
    }
})


// Borra un carrito seleccionado (se envia el ID por body)
cartRouter.delete('/:cartId', async (req, res) => {
    const cartId = req.body.cartId;
    try {
        await cartService.removeCart(cartId);
        res.status(204).send(cartId)
    } catch(err) {
        res.status(500).send(err);
    }
})



export default cartRouter;