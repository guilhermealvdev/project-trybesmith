import express from 'express';
import alvController from './controllers/alv.controller';
import productsController from './controllers/products.controller';
import usersController from './controllers/users.controller';
import loginController from './controllers/login.controller';

const app = express();

app.use(express.json());

app.get('/', alvController.testeAlv);

app.post('/products', productsController.createProduct);
app.get('/products', productsController.listProduct);

app.get('/users', usersController.listUsersAndProducts);

app.post('/login', loginController.login);

export default app;
