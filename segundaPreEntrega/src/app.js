import express from 'express';
import handlebars from 'express-handlebars';
import mongoose from 'mongoose';

import productRouter from './routes/products.router.js';
import cartRouter from './routes/carts.router.js';


const app = express();

app.use(express.json());
// Utilizamos el middleware para parsear los datos de la petición
app.use(express.urlencoded({extended: true}));

// Set handlebars
app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', 'views/');

// Seteo el directorio de archivos estáticos
app.use(express.static('public'));

app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);
// app.use('/', realtimeProducts )
// app.use('/api/chat', chatRouter);

mongoose.connect('mongodb+srv://gabyspina:gsp246813579@coderclaster.gnpohje.mongodb.net/ecommerce?retryWrites=true&w=majority');

app.listen(8080, () => {
    console.log('Escuchando puerto 8080...');
});
