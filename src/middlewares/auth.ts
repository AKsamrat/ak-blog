/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

import catchAsync from '../utils/catchAsync';
import User from '../module/user/user.model';
import { TUserRole } from '../module/user/user.interface';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    let authHeader = req.headers['authorization'];
    const match = authHeader?.match(/^Bearer\s+(.+)$/);
    if (!match) {
      res.status(401).json({ message: 'Invalid token format,You are not authorized!' });
      return;
    }

    const token = match[1];

    console.log('token', token, authHeader)
    // checking if the token is missing
    if (!token) {
      throw new Error('You are not authorized!');
    }

    // checking if the given token is valid
    const decoded = jwt.verify(token, 'secret') as JwtPayload;

    console.log({ decoded });

    const { role, email } = decoded;

    // checking if the user is exist
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error('This user is not found !');
    }

    // checking if the user is inactive
    const userStatus = user?.userStatus;

    if (userStatus === 'inactive') {
      throw new Error('This user is blocked ! !');
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new Error('You are not authorized');
    }

    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;
