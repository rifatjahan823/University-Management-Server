import { RequestHandler } from 'express'
import { service } from './user.service'

const creteControllerUser:RequestHandler = async (req, res,next) => {
  try {
    const { user } = req.body
    const result = await service.createUser(user)
    res.status(200).json({
      success: true,
      message: 'create user successfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

export const controller= {
  creteControllerUser,
}
