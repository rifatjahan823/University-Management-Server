import { NextFunction, Request, Response } from 'express'
import { service } from './user.service'
import { catchAsync } from '../../../shared/catchAsync'
import { sendResponse } from '../../../shared/sendresponse'
import httpStatus from 'http-status'
const creteControllerUser = catchAsync(async (req:Request, res:Response,next:NextFunction) => {
const { user } = req.body
  const result = await service.createUser(user)

  next()
  // res.status(200).json({
  //   success: true,
  //   message: 'create user successfully',
  //   data: result,
  // })

  sendResponse(res,{
    statusCode:httpStatus.OK,
    success:true,
    message:'create user successfully',
    data:result
  })

})

export const controller = {
  creteControllerUser,
}
