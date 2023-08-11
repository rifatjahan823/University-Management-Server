import express, { Application} from 'express'
import cors from 'cors'
import globalErrorHandalers from './app/middlewares/globalErrorHandaler'
import { userRoutes } from './app/modules/users/user.router'

//midleware-----------
const app: Application = express()
app.use(cors())
//parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1/user/', userRoutes.router)
app.use(globalErrorHandalers)

// app.get('/', async (req: Request, res: Response) => {
//  console.log('x')
// })

export default app
