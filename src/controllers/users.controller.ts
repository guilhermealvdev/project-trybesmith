import { Request, Response } from 'express';
import UserModel from '../database/models/user.model';
import ProductModel from '../database/models/product.model';

// Função para listar todos os usuários com seus respectivos produtos
const listUsersAndProducts = async (req: Request, res: Response) => {
  const users = await UserModel.findAll({
    include: [{
      model: ProductModel,
      as: 'productIds',
      attributes: ['id'],
    }],
    attributes: ['username'],
  });
  res.status(200).json(users); // Até aqui tudo certo, retornando os Users com os ids

  /*
  // Parte a ser removida, apenas para visualizar:
  const products = await ProductModel.findAll();
  res.status(200).json(products);
  */
};

export default { listUsersAndProducts };
