import { Request, Response } from 'express';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import { catchAsync } from '../../../shared/catchAsync';
import { sendResponse } from '../../../shared/sendResponse';
import { paginationFiled } from '../../../constance/pagination';
import { studentService } from './student.service';
import { IStudent } from './student.interface';
import { studentFilterableFields } from './student.constant';


// ----------------getSingleStudent---------------
const getSingleStudent = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await studentService.getSingleStudent(id);
  
    sendResponse<IStudent>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student fetched successfully !',
      data: result,
    });
  });
  

//   ------------------------getAllStudents---------------------
  const getAllStudents = catchAsync(async (req: Request, res: Response) => {
    const filters = pick(req.query, studentFilterableFields);
    const paginationOptions = pick(req.query, paginationFiled);
  
    const result = await studentService.getAllStudent(
      filters,
      paginationOptions
    );
  
    sendResponse<IStudent[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Students fetched successfully !',
      meta: result.meta,
      data: result.data,
    });
  });
  
//   -------------------updateStudent--------------------
  const updateStudent = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const updatedData = req.body;
    const result = await studentService.updateStudent(id, updatedData);
  
    sendResponse<IStudent>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Faculty updated successfully !',
      data: result,
    });
  });


//   ------------------deleteStudent----------------------------
  const deleteStudent = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await studentService.deleteStudent(id);
  
    sendResponse<IStudent>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Faculty deleted successfully !',
      data: result,
    });
  });
  
  export const StudentController = {
    getSingleStudent,
    getAllStudents,
    updateStudent,
    deleteStudent,
  };