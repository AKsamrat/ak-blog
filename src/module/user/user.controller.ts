// req and res manage

import { StatusCodes } from 'http-status-codes';
import { userService } from './user.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

const createUser = catchAsync(async (req, res) => {
  const payload = req.body;

  const result = await userService.createUser(payload);

  const resData = {
    _id: result?._id,
    name: result?.name,
    email: result?.email,
  };
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'User registered successfully',
    data: resData,
  });
});
const loginUser = catchAsync(async (req, res) => {
  const result = await userService.loginUser(req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User logged in successfully',
    // token: result?.token,
    data: {
      token: result?.token,
    },
  });
});

const getUser = catchAsync(async (req, res) => {
  const result = await userService.getUser();

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Users getting successfully',
    data: result,
  });
});

const getSingleUser = catchAsync(async (req, res) => {
  console.log(req.params);
  const userId = req.params.userId;

  const result = await userService.getSingleUser(userId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User getting successfully',
    data: result,
  });
});

const updateUser = catchAsync(async (req, res) => {
  const userId = req.params.userId;
  const body = req.body;
  const result = await userService.updateUser(userId, body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User updated successfully',
    data: result,
  });
});

const blockUser = catchAsync(async (req, res) => {
  const userId = req.params.userId;
  await userService.blockUser(userId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'user blocked successfully',
    data: '',
  });
});

export const userController = {
  createUser,
  loginUser,
  getUser,
  getSingleUser,
  updateUser,
  blockUser,
};
