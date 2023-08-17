import express from 'express'
import { userRoutes } from '../app/modules/users/user.router'
import { academicRouter } from '../app/modules/academicSemester.ts/academicSemester.router'
const routes =express.Router()

const routers=[
    {
        path:'/user',
        router:userRoutes.router
    },
    {
        path:'/academic',
        router:academicRouter.router
    }
]

routers.forEach((route)=>routes.use(route.path,route.router))

export default routes