
import express, { Request, Response } from 'express'

import userRouter from './module/user/user.router'
import { globalErrorHandler } from './middlewares/globalErrorHandler'
import blogRouters from './module/blog/blog.route'


const app = express()

// middleware
app.use(express.json())

app.use('/api/admin', userRouter)
app.use('/api/auth', userRouter)
app.use('/api/blogs', blogRouters)


// POST: /api/user/create-user

app.get('/', (req: Request, res: Response) => {
  res.send({
    status: true,
    message: 'Server Live ⚡',
  })
})


app.use(globalErrorHandler)

app.use("*", (req: Request, res: Response) => {
  res.status(404).json({
    status: false,
    message: 'Route not found'
  })
})

export default app

// req, res > jwt funtion next() > function 
// express -> workflow = 
// train -> [router]-[controller -error]-[service - error]-[errorHandler]->