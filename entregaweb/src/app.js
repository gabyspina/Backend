import express from 'express';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';

import ProductManager from '../productManager.js';
const productmanager = new ProductManager;


//Routes
import { productsRouter } from './routes/products.router.js'; 
import { cartsRouter } from './routes/carts.router.js';
import { viewsRouter } from './routes/views.router.js'; // Handlebars


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
// Seteo carpeta estatica
app.use(express.static('public'));


// Set handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', 'views/');
app.set('view engine', 'handlebars');


//Uso rutas
app.use('/api/products', productsRouter); // Utilizo ruta de products para "/api/products"
app.use('/api/carts', cartsRouter);// Utiliza ruta de cartspara "/api/carts"
app.use('/', viewsRouter); //HANDLEBARS - utiliza la ruta '/' (raiz)
app.use('/realtimeproducts', viewsRouter) // HANDLREBARS + SOKET IO



// Escucho puero 8080
const webServer = app.listen(8080, () => {
    console.log('Escuchando puerto 8080...');
});

// Inicialización de socket.io
const io = new Server(webServer);

// Cuando se conecta un cliente se envia la lista de productos
io.on('connection', async (socket) =>{
    try {
        socket.emit('realTimeProducts', await productmanager.getProducts());
    }catch(err) {
        console.log(err)
    }

    socket.on('addProduct', async (product) =>{
        try {
            await productmanager.addProduct(product);
        }catch(err){
            console.log(err);
        }
    
    }) 

    socket.emit('deleteProduct', async (productId) => {
        try{
            await productmanager.deleteProduct(productId);
        }catch(err) {
            console.log(err)
        }

    socket.emit('modifyProduct', async (productId) => {
        try {
            await productmanager.updateProduct(productId)
        } catch(err) {
            console.log(err);
        }
    })
        
    })


    
})
