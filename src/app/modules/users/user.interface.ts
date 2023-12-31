/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';
import { IStudent } from '../student/student.interface';
import { IFaculty } from '../faculty/faculty.interface';
import { IAdmin } from '../admin/admin.interface';

export interface IUserMethods {
  isUserExist(id:string):Promise<Partial<IUser>|null>
  isPasswordMatch(givenPassword:string,savePassword:string):Promise<boolean>
}


export type IUser = {
  id: string;
  role: string;
  password: string;
  needsPasswordChange:true|false;
  student?: Types.ObjectId | IStudent;
  faculty?: Types.ObjectId | IFaculty;
  admin?: Types.ObjectId | IAdmin;
};
export type UserModel = Model<IUser, Record<string, unknown>,IUserMethods>;
