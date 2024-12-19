import { StatusCodes } from "http-status-codes"
import catchAsync from "../../utils/catchAsync"
import sendResponse from "../../utils/sendResponse"
import { blogService } from "./blog.service"
import jwt, { JwtPayload } from 'jsonwebtoken';
const createBlog = catchAsync(

  async (req, res) => {
    let payload = req.body
    const token = req.headers.authorization;
    // checking if the token is missing
    if (!token) {
      throw new Error('You are not authorized!');
    }

    // checking if the given token is valid
    const decoded = jwt.verify(
      token,
      "secret",
    ) as JwtPayload;
    payload.author = decoded.id;
    // payload = [...payload, userId];
    const result = await blogService.createBlog(payload)

    sendResponse(res, {
      statusCode: StatusCodes.CREATED,
      success: true,
      message: 'Blog posted successfully',
      data: result
    }
    )
  })
const updateBlog = catchAsync(
  async (req, res) => {

    const id = req.params.id
    const body = req.body
    const result = await blogService.updateBlog(id, body)

    sendResponse(res, {
      statusCode: StatusCodes.CREATED,
      success: true,
      message: 'Blog posted successfully',
      data: result
    }
    )

  }
)

const deleteBlog = catchAsync(
  async (req, res) => {

    const id = req.params.id
    const result = await blogService.deleteBlog(id)

    sendResponse(res, {
      statusCode: StatusCodes.CREATED,
      success: true,
      message: 'Blog posted successfully',
      data: result
    }
    )

  }
)
export const blogController = {
  createBlog,
  updateBlog,
  deleteBlog
}