import { Request, Response } from 'express';
import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import UserModel from '../../../src/database/models/user.model';
import ProductModel from '../../../src/database/models/product.model';
import userController from '../../../src/controllers/users.controller';

chai.use(sinonChai);

describe('User Controller', function () {
  describe('listUsersAndProducts', function () {
    it('should list all users and their associated products', async function () {
      const req = {} as Request;

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy()
      } as unknown as Response;

      const users = [
        {
          username: 'user1',
          productIds: [{ id: 1 }, { id: 2 }],
          get: sinon.stub().returnsThis(),
        },
        {
          username: 'user2',
          productIds: [{ id: 3 }],
          get: sinon.stub().returnsThis(),
        }
      ];

      sinon.stub(UserModel, 'findAll').resolves(users as any);

      await userController.listUsersAndProducts(req, res);

      const expectedResult = [
        { username: 'user1', productIds: [1, 2] },
        { username: 'user2', productIds: [3] }
      ];

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(expectedResult);
    });
  });
});
