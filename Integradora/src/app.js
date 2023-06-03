import express from 'express';
import handlebars from 'express-handlebars';
import mongoose from 'mongoose';

import productRouter from './routers/product.router.js';
import viewsRouter from './routers/views.router.js';  	

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración de handlebars

app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', 'views/');

// Configuración de archivos estáticos
app.use(express.static('public'));

// Configuración de rutas
app.use('/api/products', productRouter);
app.use('/', viewsRouter);

// Configuración de mongoose
mongoose.connect(
	'mongodb+srv://gabyspina:gsp246813579@coderclaster.gnpohje.mongodb.net/ecommerce?retryWrites=true&w=majority'
);

app.listen(8080, () => {
	console.log('Server started on port 8080');
});
