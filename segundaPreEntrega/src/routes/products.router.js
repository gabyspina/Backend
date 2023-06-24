import {Router} from "express";
import {productService} from "../services/product.service.js";

const producRouter = Router();


producRouter.get('/', async (req, res) => {
    const {limit, page, status, category, sort} = req.query;

    try {
        const data = await productService.getAllProducts(limit, page, status, category, sort);
        // Agrega status y category a docs
        data.status = status;
        data.category = category;
        console.log(data)
        res.status(201).render('products', data);
    } catch (err) {
        res.status(500).send(err);
    }
});

producRouter.get('/:productId', async (req, res) => {
    let productId = req.params.productId;
    try {
        const product = await productService.getProductById(productId);
        res.status(201).send(product);
    } catch (err) {
        res.status(500).send(err);
    }
});


producRouter.post('/', async (req, res) => {
    const product = req.body;
    try {
        const newProduct = await productService.addProduct(product);
        res.status(201).send(newProduct);
    } catch (err) {
        res.status(500).send(err);
    }
})

producRouter.put('/:productId', async (req, res) => {
    const productId = req.params.productId;
    const product = req.body;

    try {
        const updateProduct = await productService.updateProduct(productId, product);
        res.status(201).send(updateProduct);
    } catch (err) {
        res.status(500).send(err);
    }
})

producRouter.delete('/:productId', async (req, res) => {
    const productId = req.params.productId;
    try {
        const deletedProduct = await productService.deletePruduct(productId);
        res.status(201).send(deletedProduct);
    } catch (err) {}
})

export default producRouter;
