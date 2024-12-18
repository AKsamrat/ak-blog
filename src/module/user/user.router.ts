import { Router } from 'express'
import { userController } from './user.controller'
import { UserValidation } from './userValidation'

import { USER_ROLE } from './user.constants'
import validateRequest from '../../middlewares/validateRequest'
import auth from '../../middlewares/auth'

const userRouter = Router()

userRouter.post('/register', validateRequest(UserValidation.userValidationSchema), userController.createUser)
userRouter.get('/:userId', userController.getSingleUser)
userRouter.put('/:userId', userController.updateUser)
userRouter.delete('/:userId', userController.deleteUser)
userRouter.get('/', auth(USER_ROLE.admin), userController.getUser)

export default userRouter
