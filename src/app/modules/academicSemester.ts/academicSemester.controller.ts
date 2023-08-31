import { Request, Response } from 'express';
import { academicSemesterService } from './academicSemester.service';
import { catchAsync } from '../../../shared/catchAsync';
import httpStatus from 'http-status';
import { sendResponse } from '../../../shared/sendResponse';
import pick from '../../../shared/pick';
import { paginationFiled } from '../../../constance/pagination';
import { IAcademicSemester } from './academicSemester.interface';
import { filterAbleField } from './academicSemester.Constance';

const academicController = catchAsync(async (req: Request, res: Response) => {
  const { ...academicSemesterData } = req.body;
  const controllerRequest =
    await academicSemesterService.createAcademicSemester(academicSemesterData);

  sendResponse<IAcademicSemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester Successfully Created',
    data: controllerRequest,
  });
});

const getAllSemester = catchAsync(async (req: Request, res: Response) => {
  const filter = pick(req.query, filterAbleField);

  const paginationOptions = pick(req.query, paginationFiled);

  const result = await academicSemesterService.getAllSemester(
    filter,
    paginationOptions,
  );

  sendResponse<IAcademicSemester[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester Retrived Successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleSemester = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await academicSemesterService.getSingleSemester(id);
  sendResponse<IAcademicSemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single Semester Retrived Successfully',
    data: result,
  });
});

const updateSemester = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;
  const result = await academicSemesterService.updateSemester(id, updatedData);
  sendResponse<IAcademicSemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'updated',
    data: result,
  });
});

const deleteSemester = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await academicSemesterService.deleteSemester(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Delete',
    data: result,
  });
});

export const AcademicController = {
  academicController,
  getAllSemester,
  getSingleSemester,
  updateSemester,
  deleteSemester,
};
