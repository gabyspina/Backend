import express from 'express';
import handlebars from 'express-handlebars';
import productRouter from './routes/products.router.js';

const app = express();

app.engine('handlebars', handlebars.engine());
app.set('views', './views');
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use('/api/products', productRouter);

app.listen(8080, () => {
	console.log('Server is running on port 8080');
});
