import { Request, Response } from 'express';
import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import UserModel from '../../../src/database/models/user.model';
import loginController from '../../../src/controllers/login.controller';

chai.use(sinonChai);

describe('Login Controller', function () {
  afterEach(function () {
    sinon.restore();
  });

  describe('login', function () {
    it('should return 400 if username or password is missing', async function () {
      const req = {
        body: {}
      } as Request;

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy()
      } as unknown as Response;

      await loginController.login(req, res);

      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({ message: '"username" and "password" are required' });
    });

    it('should return 401 if username or password is incorrect', async function () {
      const req = {
        body: {
          username: 'nonexistentUser',
          password: 'wrongPassword'
        }
      } as Request;

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy()
      } as unknown as Response;

      sinon.stub(UserModel, 'findOne').resolves(null);

      await loginController.login(req, res);

      expect(res.status).to.have.been.calledWith(401);
      expect(res.json).to.have.been.calledWith({ message: 'Username or password invalid' });
    });

    it('should return 401 if password is incorrect', async function () {
      const req = {
        body: {
          username: 'existingUser',
          password: 'wrongPassword'
        }
      } as Request;

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy()
      } as unknown as Response;

      const user = {
        get: sinon.stub()
      };
      user.get.withArgs('password').returns(await bcrypt.hash('correctPassword', 10));

      sinon.stub(UserModel, 'findOne').resolves(user as any);
      sinon.stub(bcrypt, 'compare').resolves(false);

      await loginController.login(req, res);

      expect(res.status).to.have.been.calledWith(401);
      expect(res.json).to.have.been.calledWith({ message: 'Username or password invalid' });
    });
  });
});
