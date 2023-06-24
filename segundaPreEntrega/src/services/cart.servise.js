import {cartModel} from "../models/carts.model.js";
import {productService} from "./product.service.js";

class CartService {
    constructor() {
        this.model = cartModel;
    }

    async getAllCarts() {
        return await this.model.find().lean().populate('products.product');
    }

    async addCart(cart) {
        return await this.model.create(cart);
    }

    async getCartById(cartId) {
        try {
            const cart = await this.model.findById(cartId).populate('products.product');
            if (! cart) {
                throw error('Carrito no encontrado');
            }
            return cart;
        } catch (err) {
            console.log(err);
            throw err;
        }
    }


    async addProductToCart(cartId, productId, quantity) {
        try {
            const cart = await this.model.findById(cartId);

            if (! cart) {
                throw new Error('Carrito no encontrado');
            }

            const product = await productService.getProductById(productId); // La validación del producto se realiza en getProductById
            let parsedQuantity = parseInt(quantity);

            if (isNaN(parsedQuantity) || parsedQuantity <= 0) {
                parsedQuantity = 1;
            }

            let existingProduct = cart.products.find((item) => item.product.toString() === productId);
            if (existingProduct) {
                existingProduct.quantity += parsedQuantity; // Actualiza la cantidad si el producto ya existe en el carrito
            } else {
                existingProduct = {
                    product: product._id,
                    quantity: parsedQuantity
                };
                cart.products.push(existingProduct);
            }

            return await cart.save();
        } catch (err) {
            console.log(err);
            throw err;
        }
    }


    async deleteProductFromCart(cartId, productId) {
      try {
          const cart = await this.model.findById(cartId);
          if (!cart) {
              throw new Error('Carrito no encontrado');
          }
  
          const existingProduct = cart.products.find((item) => item.product.toString() === productId);
          if (existingProduct) {
              cart.products.pull(existingProduct._id);
              await cart.save();
          } else {
              throw new Error('Producto no encontrado');
          }
  
          return cart;
      } catch (error) {
          console.error(error);
          throw error;
      }
  }

  
  async emptyCart(cartId) {
    try {
        const cart = await this.model.findById(cartId);
        if (!cart) {
            throw new Error('Carrito no encontrado');
        }

        cart.products = []; // Asigna un array vacío para eliminar todos los productos del carrito
        await cart.save();

        return cart;
    } catch (err) {
        console.error(err);
        throw err;
    }
}


    async removeCart(cartId) {
        return this.model.deleteOne({_id: cartId});
    }

}

const cartService = new CartService();
export default cartService;
