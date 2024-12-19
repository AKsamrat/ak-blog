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
    const resData = {
      _id: result?._id,
      title: result?.title,
      content: result?.content,
      author: result?.author,

    }

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Blog created successfully',
      data: resData
    }
    )
  })
const updateBlog = catchAsync(
  async (req, res) => {

    const id = req.params.id
    const body = req.body
    const result = await blogService.updateBlog(id, body)

    const resData = {
      _id: result?._id,
      title: result?.title,
      content: result?.content,
      author: result?.author,

    }

    sendResponse(res, {
      statusCode: StatusCodes.CREATED,
      success: true,
      message: 'Blog updated successfully',
      data: resData
    }
    )

  }
)

const deleteBlog = catchAsync(
  async (req, res) => {

    const id = req.params.id
    const result = await blogService.deleteBlog(id)

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Blog deleted successfully',
      data: ''
    }
    )

  }
)
const getALlBlog = catchAsync(
  async (req, res) => {
    const result = await blogService.getAllBlog(req.query)

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Blog retrived successfully',
      data: result
    }
    )

  }
)
export const blogController = {
  createBlog,
  updateBlog,
  deleteBlog,
  getALlBlog
}