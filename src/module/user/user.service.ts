import { IUser } from './user.interface';
import User from './user.model';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import AppError from '../../helpers/appError';
import { StatusCodes } from 'http-status-codes';

const createUser = async (payload: IUser): Promise<IUser> => {
  // payload.role = 'admin';
  const result = await User.create(payload);

  return result;
};
const loginUser = async (payload: { email: string; password: string }) => {
  // checking if the user is exist
  const user = await User.findOne({ email: payload?.email }).select(
    '+password',
  );

  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'This user is not found !');
  }

  // checking if the user is inactive
  const userStatus = user?.userStatus;

  if (userStatus === 'inactive') {
    throw new AppError(StatusCodes.NOT_ACCEPTABLE, 'This user is blocked ! !');
  }

  //checking if the password is correct
  const isPasswordMatched = await bcrypt.compare(
    payload?.password,
    user?.password,
  );

  if (!isPasswordMatched) {
    throw new AppError(
      StatusCodes.FORBIDDEN,
      'Invalid Credential or Password? 😈',
    );
  }

  //create token and sent to the  client
  const jwtPayload = {
    id: user?._id,
    email: user?.email,
    role: user?.role,
  };

  const token = jwt.sign(jwtPayload, 'secret', { expiresIn: '1d' });

  return { token, user };
};

const getUser = async () => {
  const result = await User.find();
  return result;
};

const getSingleUser = async (id: string) => {
  //   const result = await User.findOne({name:"habi jabi"})
  const result = await User.findById(id);
  return result;
};

const updateUser = async (id: string, data: IUser) => {
  const result = await User.findByIdAndUpdate(id, data, {
    new: true,
  });
  return result;
};

const blockUser = async (id: string) => {
  const result = await User.findByIdAndUpdate(id, { isBlocked: true });
  return result;
};

export const userService = {
  createUser,
  loginUser,
  getUser,
  getSingleUser,
  updateUser,
  blockUser,
};
