// Esse codigo é teste, criado apenas para testar no inicio do projeto e funcionalidades

import { Request, Response } from 'express';

const testeAlv = async (req: Request, res: Response) => res.status(200).json({ message: 'Alv2' });

export default { testeAlv };