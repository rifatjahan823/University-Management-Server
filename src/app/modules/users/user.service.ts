import mongoose from 'mongoose';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { AcademicSemester } from '../academicSemester.ts/academicSemester.model';
import { IStudent } from '../student/student.interface';
import { IUser } from './user.interface';
import { User } from './user.model';
import { adminId, facultyId, genarateStudentId } from './user.utils';
import { Student } from '../student/student.model';
import httpStatus from 'http-status';
import { IAcademicSemester } from '../academicSemester.ts/academicSemester.interface';
import { IFaculty } from '../faculty/faculty.interface';
import { IAdmin } from '../admin/admin.interface';

// -------------create-student-------------
// -----------------********************--------------
const createStudent = async (
  student: IStudent,
  user: IUser,
): Promise<IUser | null> => {
  //defult password
  if (!user.password) {
    user.password = config.defult_student_password as string;
  }

  //set role
  user.role = 'student';
  //get academic semester to set id
  const academicSemester = await AcademicSemester.findById(
    student.academicSemester,
  );

  //auto genarated incremental id
  let newUserAllData=null;  
  const session = await mongoose.startSession();
  try {

    session.startTransaction();
    const id = await genarateStudentId(academicSemester as IAcademicSemester);
    user.id = id;
    student.id = id;
    const newStudent = await Student.create([student], { session });
    if (!newStudent.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Fail to create student');
    }

    //set student _id into user
    user.student = newStudent[0]._id;
    const newUser = await User.create([user], { session });
    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Fail to create user');
    }

    newUserAllData=newUser[0]

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  if(newUserAllData){
    newUserAllData=await User.findOne({id:newUserAllData.id}).populate({
      path:"student",
      populate:[{path:"academicDepartment"},{path:"academicFaculty"}]
    })
  }
  return newUserAllData
};

// -------------create-Faculty-------------
// -----------------********************--------------
const createFaculty = async (
 faculty: IFaculty,
  user: IUser,
): Promise<IUser | null> => {
  //defult password
  if (!user.password) {
    user.password = config.default_facilty_password as string;
  }

  //set role
  user.role = 'faculty';

  //auto genarated incremental id
  let newUserAllData=null;  
  const session = await mongoose.startSession();
  try {

    session.startTransaction();
    const id = await facultyId();
    user.id = id;
    faculty.id = id;
    const newStudent = await Student.create([faculty], { session });
    if (!newStudent.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Fail to create Faculty');
    }

    //set student _id into user
    user.student = newStudent[0]._id;
    const newUser = await User.create([user], { session });
    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Fail to create user');
    }

    newUserAllData=newUser[0]

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  if(newUserAllData){
    newUserAllData=await User.findOne({id:newUserAllData.id}).populate({
      path:"student",
      populate:[{path:"academicDepartment"},{path:"academicFaculty"}]
    })
  }
  return newUserAllData
};


// -------------create-Admin-------------
// -----------------********************--------------
const createAdmin = async (
  admin: IAdmin,
  user: IUser,
): Promise<IUser | null> => {
  //defult password
  if (!user.password) {
    user.password = config.default_admin_password as string
  }

  //set role
  user.role = 'admin';

  //auto genarated incremental id
  let newUserAllData=null;  
  const session = await mongoose.startSession();
  try {

    session.startTransaction();
    const id = await adminId();
    user.id = id;
    admin.id = id;
    const newStudent = await Student.create([admin], { session });
    if (!newStudent.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Fail to create student');
    }

    //set student _id into user
    user.student = newStudent[0]._id;
    const newUser = await User.create([user], { session });
    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Fail to create user');
    }

    newUserAllData=newUser[0]

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  if(newUserAllData){
    newUserAllData=await User.findOne({id:newUserAllData.id}).populate({
      path:"student",
      populate:[{path:"academicDepartment"},{path:"academicFaculty"}]
    })
  }
  return newUserAllData
};

export const service = { 
  createStudent ,
  createFaculty,
  createAdmin
};
