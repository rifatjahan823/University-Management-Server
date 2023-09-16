import { Request, Response } from 'express';
import { service } from './user.service';
import { catchAsync } from '../../../shared/catchAsync';
import httpStatus from 'http-status';
import { sendResponse } from '../../../shared/sendResponse';


// --------------------Create-Student--------------
const creteControllerStudent = catchAsync(async (req: Request, res: Response) => {
  const {student, ...userData } = req.body;
  const result = await service.createStudent(student,userData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'create Studentsuccessfully',
    data: result,
  });
});

// --------------------Create-Faculty--------------
const creteControllerFaculty = catchAsync(async (req: Request, res: Response) => {
  const {faculty, ...userData } = req.body;
  const result = await service.createFaculty(faculty,userData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'create Faculty successfully',
    data: result,
  });
});

// --------------------Create-Student--------------
const creteControllerAdmin = catchAsync(async (req: Request, res: Response) => {
  const {admin, ...userData } = req.body;
  const result = await service.createAdmin(admin,userData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'create Adminsuccessfully',
    data: result,
  });
});




export const controller = {
  creteControllerStudent,
  creteControllerFaculty,
  creteControllerAdmin
};
