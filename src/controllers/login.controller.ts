import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import UserModel from '../database/models/user.model';

const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  // Verificar se os campos "username" e "password" foram enviados
  if (!username || !password) {
    return res.status(400).json({ message: '"username" and "password" are required' });
  }

  // Buscar o usuário pelo username no banco de dados
  const user = await UserModel.findOne({ where: { username } });

  // Verificar se o usuário existe e se a senha está correta
  if (!user || !(await bcrypt.compare(password.toString(), user.get('password') as string))) {
    return res.status(401).json({ message: 'Username or password invalid' });
  }

  // Gerar um token JWT com id e username do usuário
  const token = jwt.sign({
    id: user.get('id'),
    username: user.get('username'),
  }, 'secret_key', { expiresIn: '1h' });

  // Retornar o token JWT
  return res.status(200).json({ token });
};

export default { login };
