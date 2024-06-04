import { Request, Response } from 'express';
import ProductModel, { ProductInputtableTypes } from '../database/models/product.model';

async function createProduct(req: Request, res: Response): Promise<void> {
  const { name, price, userId } = req.body as ProductInputtableTypes;
  const product = await ProductModel.create({ name, price, userId }); // Pulei a camada service aqui e fiz tudo na controller
  res.status(201).json(product);
}

export default { createProduct };