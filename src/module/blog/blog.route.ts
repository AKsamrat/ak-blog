import { Router } from "express";
import { blogController } from "./blog.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constants";

const blogRouters = Router()
blogRouters.post('/', auth(USER_ROLE.user), blogController.createBlog)
blogRouters.put('/:id', auth(USER_ROLE.user), blogController.updateBlog)
blogRouters.delete('/:id', auth(USER_ROLE.user), blogController.deleteBlog)

export default blogRouters;