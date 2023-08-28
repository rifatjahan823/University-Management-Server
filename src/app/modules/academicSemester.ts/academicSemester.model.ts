import { Model, Schema, model } from 'mongoose';
import { IAcademicSemester } from './academicSemester.interface';
import {
  codeArray,
  monthsArray,
  titleArray,
} from './academicSemester.Constance';
import ApiError from '../../../errors/ApiError';
import status from 'http-status';

// Create a new Model type that knows about IUserMethods...
type UserModel = Model<IAcademicSemester>;

const academicSemesterSchema = new Schema<IAcademicSemester, UserModel>(
  {
    title: { type: String, required: true, enum: titleArray },
    year: { type: String, required: true },
    code: { type: String, required: true, enum: codeArray },
    startMonth: { type: String, required: true, enum: monthsArray },
    endMonth: { type: String, required: true, enum: monthsArray },
  },
  {
    timestamps: true,
  },
);

academicSemesterSchema.pre('save', async function (next) {
  const isExist = await AcademicSemester.findOne({
    title: this.title,
    year: this.year,
  });
  if (isExist) {
    throw new ApiError(status.CONFLICT, 'Academic Semester is already exist');
  }
  next();
});

export const AcademicSemester = model<IAcademicSemester, UserModel>(
  'AcademicSemester',
  academicSemesterSchema,
);
