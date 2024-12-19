import { Router } from 'express'
import { userController } from './user.controller'
import { UserValidation } from './userValidation'

import { USER_ROLE } from './user.constants'
import validateRequest from '../../middlewares/validateRequest'
import auth from '../../middlewares/auth'
import { blogController } from '../blog/blog.controller'

const userRouter = Router()

userRouter.post('/register', validateRequest(UserValidation.userValidationSchema), userController.createUser)
userRouter.post('/login', validateRequest(UserValidation.userValidationSchema), userController.loginUser)

userRouter.delete('/blogs/:id', auth(USER_ROLE.admin), blogController.deleteBlog)
userRouter.patch('/users/:userId/block', auth(USER_ROLE.admin), userController.blockUser)


export default userRouter
