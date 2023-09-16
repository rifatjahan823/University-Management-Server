import { Model, Schema, model } from 'mongoose';
import { IAcademicFaculty } from './academicFaculty.interface';

// Create a new Model type that knows about IUserMethods...
type academicFacultyModel = Model<IAcademicFaculty, Record<string, unknown>>;

// 2. Create a Schema corresponding to the document interface.
const academicFacultySchema = new Schema<
  IAcademicFaculty,
  academicFacultyModel
>({
  title: { type: String, required: true },
});

// 3. Create a Model.
export const AcademicFaculty = model<IAcademicFaculty, academicFacultyModel>(
  'AcademicFaculty',
  academicFacultySchema,
);
