import { Request, Response } from 'express';
import UserModel from '../database/models/user.model';
import ProductModel from '../database/models/product.model';
import { User } from '../types/User';

const listUsersAndProducts = async (req: Request, res: Response) => {
  // Buscar todos os usuários e incluir os produtos associados
  const users = await UserModel.findAll({
    include: [{
      model: ProductModel,
      as: 'productIds',
      attributes: ['id'],
    }],
    attributes: ['username'],
  });

  // Formatar os dados conforme solicitado
  const result = users.map((user) => {
    const userData = user.get({ plain: true }) as User & { productIds: { id: number }[] };

    // Verificar se productIds existe e não é undefined
    const productIds = Array.isArray(userData.productIds)
    && typeof userData.productIds[0] === 'object'
      ? userData.productIds.map((product: { id: number }) => product.id)
      : userData.productIds as number[];

    return { username: userData.username, productIds };
  });

  // Retornar a resposta com status 200
  res.status(200).json(result);
};

export default { listUsersAndProducts };
