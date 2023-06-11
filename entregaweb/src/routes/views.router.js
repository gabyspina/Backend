import {Router} from "express";
import ProductManager from "../../productManager.js";

const viewsRouter = Router();
const productManager = new ProductManager();

viewsRouter.get('/', async (req, res) => {
    try {
        const products = await productManager.getProducts();
        const formData = req.body;
        res.render('home', { products, formData });
    }catch(err){
        console.log(err)
    }
})

viewsRouter.get('/realtimeproducts', async (req, res) => {
    try {
        res.render('realtimeproducts');
    }catch(err){
        console.log(err)
    }
})
export { viewsRouter };