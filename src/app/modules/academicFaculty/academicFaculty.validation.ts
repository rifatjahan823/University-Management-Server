import { z } from "zod";

const academicFacultyZodSchema=z.object({
    body:z.object({
        title:z.string({required_error:'Title is Requiewd'})
    })
})
const academicFacultyUpdateZodSchema=z.object({
    body:z.object({
        title:z.string({required_error:'Title is Requiewd'})
    })
})

export const facultyValidation={
    academicFacultyZodSchema,
    academicFacultyUpdateZodSchema
}