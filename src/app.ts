import express, { Application } from 'express'
import cors from 'cors'
import globalErrorHandalers from './app/middlewares/globalErrorHandaler'
import routes from './rotes'


//midleware-----------
const app: Application = express()
app.use(cors())
//parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// app.use('/api/v1/user/', userRoutes.router)
// app.use('/api/v1/academic/',academicRouter.router)
app.use('/api/v1/',routes)
app.use(globalErrorHandalers)

// app.get('/', async (req: Request, res: Response) => {
//  console.log('x')
// })

export default app
