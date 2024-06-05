import { Request, Response } from 'express';
import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import ProductModel from '../../../src/database/models/product.model';
import productController from '../../../src/controllers/products.controller';
import { Product } from '../../../src/types/Product';

chai.use(sinonChai);

describe('Product Controller', function () {
  describe('createProduct', function () {
    it('should create a product', async function () {
      const req = {
        body: {
          name: 'Test Product',
          price: '10',
          userId: 1
        }
      } as Request;

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy()
      } as unknown as Response;

      const expectedResult: Product = {
        id: 1,
        name: 'Test Product',
        price: '10',
        userId: 1
      };

      sinon.stub(ProductModel, 'create').resolves(expectedResult as any); // Corrija aqui para corresponder ao tipo esperado

      await productController.createProduct(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(expectedResult);
    });
  });

  describe('listProduct', function () {
    it('should list all products', async function () {
      const req = {} as Request;

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy()
      } as unknown as Response;

      const products: Product[] = [
        {
          id: 1,
          name: 'Product 1',
          price: '10',
          userId: 1
        },
        {
          id: 2,
          name: 'Product 2',
          price: '20',
          userId: 2
        }
      ];

      sinon.stub(ProductModel, 'findAll').resolves(products as any); // Corrija aqui para corresponder ao tipo esperado

      await productController.listProduct(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(products);
    });
  });
});
