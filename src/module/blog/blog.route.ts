import { Router } from "express";
import { blogController } from "./blog.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constants";

const blogRouters = Router()
blogRouters.post('/', auth(USER_ROLE.user), blogController.createBlog)
blogRouters.patch('/:id', auth(USER_ROLE.user), blogController.updateBlog)
blogRouters.delete('/:id', auth(USER_ROLE.user), blogController.deleteBlog)
blogRouters.get('/', auth(USER_ROLE.user), blogController.getALlBlog)

export default blogRouters;