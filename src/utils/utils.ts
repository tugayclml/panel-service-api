import { Request } from 'express';
import { decode } from 'jsonwebtoken';

export const extractTokenPayload = (req: Request) => {
  console.log(req.headers);
  
  const token = req.headers['authorization'] as string;
  const jwtPayload = decode(token.replace('Bearer ', ''));

  return jwtPayload;
};
