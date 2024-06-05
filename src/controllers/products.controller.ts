import { Request, Response } from 'express';
import ProductModel, { ProductInputtableTypes } from '../database/models/product.model';

// Req 1
// Pulei a camada service aqui e fiz tudo na controller
async function createProduct(req: Request, res: Response): Promise<void> {
  const { name, price, userId } = req.body as ProductInputtableTypes;
  const product = await ProductModel.create({ name, price, userId }); // create pra criar no database
  res.status(201).json(product);
}

// Req 2
// Pulei novamente a service, fiz tudo no controller
async function listProduct(req: Request, res: Response): Promise<void> {
  const products = await ProductModel.findAll(); // findAll para buscar todos no database
  res.status(200).json(products);
}

export default { createProduct, listProduct };
