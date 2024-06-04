import express from 'express';
import alvController from './controllers/alv.controller';
import productsController from './controllers/products.controller';

const app = express();

app.use(express.json());

app.get('/', alvController.testeAlv);

app.post('/products', productsController.createProduct);

export default app;
