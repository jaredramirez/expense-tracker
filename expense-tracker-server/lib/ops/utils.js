import bcrypt from 'bcrypt-nodejs';
import jwt from 'jsonwebtoken';

export const compare = (string, hashed) => bcrypt.compareSync(string, hashed);

export const hash = (string, salt) => bcrypt.hashSync(string, bcrypt.genSaltSync(salt));

export const generateJwt = (claims, secret) => jwt.sign(claims, secret, {
  expiresIn: '3h',
  algorithm: 'HS256',
});

export const isValidId = id => new RegExp('^[0-9a-fA-F]{24}$').test(id);

