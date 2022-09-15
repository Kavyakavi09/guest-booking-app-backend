import jwt from 'jsonwebtoken';
import { createError } from './error.js';

// guest authorization
// To protect guest api's
export const verifGuest = (req, res, next) => {
  const token = req.headers.guestauth || req.headers.GuestAuth;
  if (!token) return next(createError(401, 'You are not authenticated!'));

  jwt.verify(token, process.env.JWT, (err, guest) => {
    if (err) return next(createError(403, 'Token is not valid!'));
    req.guest = guest;

    next();
  });
};

// owner authorization
// To protect owner api's
export const verifyOwner = (req, res, next) => {
  const token = req.headers.ownerauth || req.headers.OwnerAuth;
  if (!token) return next(createError(401, 'You are not authenticated!'));

  jwt.verify(token, process.env.JWT, (err, owner) => {
    if (err) return next(createError(403, 'Token is not valid!'));
    req.owner = owner;

    next();
  });
};
