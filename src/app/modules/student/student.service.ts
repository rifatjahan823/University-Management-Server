/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose, { SortOrder } from 'mongoose';
import { IGenericResponse } from '../../../interfaces/common';
import httpStatus from 'http-status';
import { User } from '../users/user.model';
import { PaginationOptions } from '../../../interfaces/pagination';
import ApiError from '../../../errors/ApiError';
import { calculatePagination } from '../../../helpers/paginationHelpers';
import { IStudent, IStudentFilters } from './student.interface';
import { Student } from './student.model';
import { studentSearchableFields } from './student.constant';

// ----------------get-single------------
const getSingleStudent = async (id: string): Promise<IStudent | null> => {
    const result = await Student.findOne({ id })
      .populate('AcademicDepartment')
      .populate('AcademicSemester');
  
    return result;
  };
  
//   ---------------get-all---------
  const getAllStudent = async (
    filters: IStudentFilters,
    paginationOptions: PaginationOptions
  ): Promise<IGenericResponse<IStudent[]>> => {
    // Extract searchTerm to implement search query
    const { searchTerm, ...filtersData } = filters;
    const { page, limit, skip, sortBy, sortOrder } =
     calculatePagination(paginationOptions);
  
    const andConditions = [];
  
    // Search needs $or for searching in specified fields
    if (searchTerm) {
      andConditions.push({
        $or: studentSearchableFields.map(field => ({
          [field]: {
            $regex: searchTerm,
            $options: 'i',
          },
        })),
      });
    }
    // Filters needs $and to fullfill all the conditions
    if (Object.keys(filtersData).length) {
      andConditions.push({
        $and: Object.entries(filtersData).map(([field, value]) => ({
          [field]: value,
        })),
      });
    }
  
    // Dynamic  Sort needs  field to  do sorting
    const sortConditions: { [key: string]: SortOrder } = {};
    if (sortBy && sortOrder) {
      sortConditions[sortBy] = sortOrder;
    }
    const whereConditions =
      andConditions.length > 0 ? { $and: andConditions } : {};
  
    const result = await Student.find(whereConditions)
      .populate('AcademicSemester')
      .populate('AcademicDepartment')
      .populate('AcademicFaculty')
      .sort(sortConditions)
      .skip(skip)
      .limit(limit);
  
    const total = await Student.countDocuments(whereConditions);
  
    return {
      meta: {
        page,
        limit,
        total,
      },
      data: result,
    };
  };
  
//   ------------------------update-Student------------
  const updateStudent = async (
    id: string,
    payload: Partial<IStudent>
  ): Promise<IStudent | null> => {
    const isExist = await Student.findOne({ id });
  
    if (!isExist) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Student not found !');
    }
  
    const { name,guardian,localGuardian, ...StudentData } = payload;
    const updatedStudentData: Partial<IStudent> = { ...StudentData };
  
    if (name && Object.keys(name).length > 0) {
      Object.keys(name).forEach(key => {
        const nameKey = `name.${key}` as keyof Partial<IStudent>;
        (updatedStudentData as any)[nameKey] = name[key as keyof typeof name];
      });
    }
    if (guardian && Object.keys(guardian).length > 0) {
      Object.keys(guardian).forEach(key => {
        const guardianKey =`guardian.${key}` as keyof Partial<IStudent>;
        (updatedStudentData as any)[guardianKey] = guardian[key as keyof typeof guardian];
      });
    }
    if (localGuardian  && Object.keys(localGuardian ).length > 0) {
      Object.keys(localGuardian ).forEach(key => {
        const localGuardianKey =`localGuardian${key}` as keyof Partial<IStudent>;
        (updatedStudentData as any)[localGuardianKey] = localGuardian [key as keyof typeof localGuardian ];
      });
    }
  
    const result = await Student.findOneAndUpdate({ id }, updatedStudentData, {
      new: true,
    });
    return result;
  };


//   ----------------Delete-Student------------
  
  const deleteStudent = async (id: string): Promise<IStudent | null> => {
    // check if the faculty is exist
    const isExist = await Student.findOne({ id });
  
    if (!isExist) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Student not found !');
    }
  
    const session = await mongoose.startSession();
  
    try {
      session.startTransaction();
      //delete faculty first
      const student = await Student.findOneAndDelete({ id }, { session });
      if (!student) {
        throw new ApiError(404, 'Failed to delete student');
      }
      //delete user
      await User.deleteOne({ id });
      session.commitTransaction();
      session.endSession();
  
      return student;
    } catch (error) {
      session.abortTransaction();
      throw error;
    }
  };
  
  export const studentService = {
    getAllStudent,
    getSingleStudent,
    updateStudent,
    deleteStudent
  };