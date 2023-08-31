import { Request, Response } from 'express';
import { service } from './user.service';
import { catchAsync } from '../../../shared/catchAsync';
import httpStatus from 'http-status';
import { sendResponse } from '../../../shared/sendResponse';

const creteControllerUser = catchAsync(async (req: Request, res: Response) => {
  const { user } = req.body;
  const result = await service.createUser(user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'create user successfully',
    data: result,
  });
});

export const controller = {
  creteControllerUser,
};
