import fs from 'fs';

import ProductManager from './productManager.js'
const productManager = new ProductManager;

export default class CartManager {
    constructor() {
        this.path = './carts.json';
        this.carts = [];
        // Si no existe ./users.json
        if (!fs.existsSync('./carts.json')) { // escribo el archivo de forma sincronica con un array vacio
            fs.writeFileSync('./carts.json', JSON.stringify([]));
        }
    }


    async getCarts() {
        try {
            const fileContents = fs.readFileSync(this.path, 'utf-8');
            return JSON.parse(fileContents);

        } catch (err) {
            console.log(err);
        }

    }


    async newCart() {
        try {
            const carts = await this.getCarts();
            const lastCart = carts[carts.length - 1];
            const id = lastCart ? lastCart.id + 1 : 1;
            const newCart = {
                id,
                "products": []
            };
            carts.push(newCart);
            fs.writeFileSync(this.path, JSON.stringify(carts));
            return newCart;

        } catch (err) {
            console.log(err);
        }
    }


    async getCartByID(id) {
        try {
            const carts = await this.getCarts();
            const cart = await carts.find((cart) => cart.id === id);
            console.log(cart ? cart : '*** No se ha encontrado un carrito con el ID indicado')
            return(cart ? cart : '*** No se ha encontrado un carrito con el ID indicado');
        } catch (err) {
            console.log(err);
        }
    }


    async addToCart(cid, pid) {
        try {
            const carts = await this.getCarts();
            const cart = carts.find((cart) => cart.id === parseInt(cid));

            if (! cart) {
                throw new Error('No se encuentra carrito con el ID indicado');
            }

            const products = await productManager.getProducts();
            const product = await products.find((product) => product.id === parseInt(pid));

            if (! product) {
                throw new Error('No se encuentra carrito con el ID indicado');
            }

            const productIndex = cart.products.findIndex((product) => product.id === parseInt(pid));

            if (productIndex !== -1) { // Si el producto ya existe en el carrito, incrementa la cantidad en 1
                cart.products[productIndex].quantity += 1;
            } else { // Si el producto no existe en el carrito, agrégalo con una cantidad inicial de 1
                cart.products.push({id: parseInt(pid), quantity: 1});
            }

            await fs.promises.writeFile(this.path, JSON.stringify(carts));
            return cart.products; // Devuelve los productos actualizados del carrito
            
        } catch (err) {
            console.log(err);
        }
    }

    /* async addToCart(cid, pid){
        try {
            const carts = await this.getCarts();
            const cart = await carts.find((cart) => cart.id === parseInt(cid));
            
            const products = await productManager.getProducts();
            const product = await products.find((product) => product.id === parseInt(pid));
            console.log(cart.products)
            cart.products.push({"id":product.id, "quantity": 1});
            await fs.promises.writeFile(this.path, JSON.stringify(carts));
            console.log(JSON.stringify(carts));
            return cart.products
        }catch(err){
            console.log(err)
        }
       
        
    }*/

}


const cartManager = new CartManager();

const test = async () => {
    try {


        await cartManager.addToCart(4, 15)


    } catch (err) {
        console.log(err);
    }
}
