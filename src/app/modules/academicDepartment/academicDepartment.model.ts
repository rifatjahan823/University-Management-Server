import { Schema, model } from "mongoose";
import { AcademicDepartmentModel, IAcademicDepartment } from "./academicDepartment.interface";


// 2. Create a Schema corresponding to the document interface.
const AcademicDepartmentSchema = new Schema<IAcademicDepartment,AcademicDepartmentModel>(
  {
    title: {type: String,required: true, unique: true,},
    academicFaculty: {type: Schema.Types.ObjectId,ref: 'academicFaculty',required: true,},
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const AcademicDepartment = model<IAcademicDepartment, AcademicDepartmentModel>('AcademicDepartment', AcademicDepartmentSchema);