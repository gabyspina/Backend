import {Router} from "express";
import ProductManager from "../../productManager.js";

const productsRouter = Router();

const productManager = new ProductManager();


// req.query: permite establecer un limite de productos a mostrar. Ej:   http://localhost:8080/api/products/?limit=4
// Si no se especifica limite muestra todos los productos
productsRouter.get('/', async (req, res) => {
    try {
        const allProducts = await productManager.getProducts();
        const limit = req.query.limit;

        ! limit ? res.send(allProducts) : res.send(allProducts.slice(0, limit));

    } catch (err) {
        console.log(err);
    }

})

// req.params: permite buscar un producto por su ID EJ: http://localhost:8080/api/products/2
productsRouter.get('/:pid', async (req, res) => {
    try {
        let productById = await productManager.getProductById(parseInt(req.params.pid));
        res.status(201).send(productById);
    } catch (err) {
        console.log(err);
    }
})

// put para modificar productos por su ID
productsRouter.put('/:pid', async (req, res) => {
    try {
        const product = req.body;
        await productManager.updateProduct(parseInt(req.params.pid), product);
        res.status(201).send(product);
    } catch (err) {
        console.log(err);
    }

})

// post para agregar productos
productsRouter.post('/', async (req, res) => {
    try {
        const product = req.body;
        await productManager.addProduct(product);
        res.status(201).send(product);
    } catch (err) {
        console.log(err);
    }

});


// delete para eliminar productos por ID
productsRouter.delete('/:pid', (req, res) => {
    productManager.deleteProduct(parseInt(req.params.pid));
    res.status(201).send('Producto eliminado')
})

export {
    productsRouter
};
