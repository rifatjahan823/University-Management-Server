import { z } from 'zod';
import { bloodGroup, gender } from '../student/student.constant';

// -------------student-schema-----------------
const createUserZodShema = z.object({
  body: z.object({
    password: z.string().optional(),
    student: z.object({
      name: z.object({
        firstName: z.string({ required_error: 'FirstName is Required' }),
        middleName: z.string().optional(),
        lastName: z.string({ required_error: 'LastName is Required' }),
      }),
      gender: z.enum([...gender] as [string, ...string[]], {
        required_error: 'Gender is required',
      }),
      dateOfBirth: z.string({ required_error: 'Birth Date is Required' }),
      email: z.string({ required_error: 'Email is Required' }),
      contactNo: z.string({ required_error: 'ContactNo is Required' }),
      emergencyContactNo: z.string({
        required_error: 'Emergency ContactNo is Required',
      }),
      bloodGroup: z.enum([...bloodGroup] as [string, ...string[]]).optional(),
      presentAddress: z.string({
        required_error: 'presentAddress is Required',
      }),
      permanentAddress: z.string({
        required_error: 'permanentAddress is Required',
      }),
      guardian: z.object({
        fatherName: z.string({ required_error: 'fatherName is required' }),
        fatherOccupation: z.string({
          required_error: 'fatherOccupation is Required',
        }),
        fatherContactNo: z.string({
          required_error: 'fatherContactNo is required',
        }),
        motherName: z.string({ required_error: 'motherName is Required' }),
        motherOccupation: z.string({
          required_error: 'motherOccupation is required',
        }),
        motherContactNo: z.string({
          required_error: 'motherContactNo is required',
        }),
        address: z.string({ required_error: 'address is required' }),
      }),
      localGuardian: z.object({
        name: z.string({ required_error: 'Name is Required' }),
        occupation: z.string({ required_error: 'occupation is Required' }),
        contactNo: z.string({ required_error: 'ContactNo is Required' }),
        address: z.string({ required_error: 'Address is Required' }),
      }),
      academicFaculty: z.string({
        required_error: 'AcademicFaculty is Required',
      }),
      academicDepartment: z.string({
        required_error: 'AcademicDepartmentis Required',
      }),
      academicSemester: z.string({
        required_error: 'AcademicSemesteris Required',
      }),
      profileImage: z.string().optional(),
    }),
  }),
});

// -------------Faculty-schema-----------------
const createFacultyZodShema = z.object({
  body: z.object({
    password: z.string().optional(),
    faculty: z.object({
      name: z.object({
        firstName: z.string({ required_error: 'FirstName is Required' }),
        middleName: z.string().optional(),
        lastName: z.string({ required_error: 'LastName is Required' }),
      }),
      gender: z.enum([...gender] as [string, ...string[]], {
        required_error: 'Gender is required',
      }),
      dateOfBirth: z.string({ required_error: 'Birth Date is Required' }),
      email: z.string({ required_error: 'Email is Required' }),
      contactNo: z.string({ required_error: 'ContactNo is Required' }),
      emergencyContactNo: z.string({
        required_error: 'Emergency ContactNo is Required',
      }),
      bloodGroup: z.enum([...bloodGroup] as [string, ...string[]]).optional(),
      presentAddress: z.string({
        required_error: 'presentAddress is Required',
      }),
      permanentAddress: z.string({
        required_error: 'permanentAddress is Required',
      }),

      academicFaculty: z.string({
        required_error: 'AcademicFaculty is Required',
      }),
      academicDepartment: z.string({
        required_error: 'AcademicDepartmentis Required',
      }),
      profileImage: z.string().optional(),
    }),
  }),
});

// -------------admin-schema-----------------
const createAdminZodShema = z.object({
  body: z.object({
    password: z.string().optional(),
    admin: z.object({
      name: z.object({
        firstName: z.string({ required_error: 'FirstName is Required' }),
        middleName: z.string().optional(),
        lastName: z.string({ required_error: 'LastName is Required' }),
      }),
      gender: z.enum([...gender] as [string, ...string[]], {
        required_error: 'Gender is required',
      }),
      dateOfBirth: z.string({ required_error: 'Birth Date is Required' }),
      email: z.string({ required_error: 'Email is Required' }),
      contactNo: z.string({ required_error: 'ContactNo is Required' }),
      emergencyContactNo: z.string({
        required_error: 'Emergency ContactNo is Required',
      }),
      bloodGroup: z.enum([...bloodGroup] as [string, ...string[]]).optional(),
      presentAddress: z.string({
        required_error: 'presentAddress is Required',
      }),
      permanentAddress: z.string({
        required_error: 'permanentAddress is Required',
      }),
      academicDepartment: z.string({
        required_error: 'AcademicDepartmentis Required',
      }),
      profileImage: z.string().optional(),
    }),
  }),
});

export const userValidation = {
  createUserZodShema,
  createFacultyZodShema,
  createAdminZodShema,
};
