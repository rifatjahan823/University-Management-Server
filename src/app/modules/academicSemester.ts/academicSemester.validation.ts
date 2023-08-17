import { z } from "zod";
import { codeArray, monthsArray, titleArray } from "./academicSemester.Constance";

const academicSemesterZodSchema=z.object({
    body:z.object({
        title:z.enum(
            [...titleArray]as [string,...string[]],
            {
                required_error:'Title is Required'
            }
            ),
        year:z.string({
            required_error:"Year is Required"
        }),
        code:z.enum(
            [...codeArray]as[string,...string[]],
            {
                required_error:'Code is Required'
            }
            ),
            startMonth:z.enum(
                [...monthsArray]as [string,...string[]],
                {
                    required_error:'Start-Month is Require'
                }
                ) ,  
            endMonth:z.enum(
                [...monthsArray]as [string,...string[]],
                {
                    required_error:'End-Month is Require'
                }
                )   
    })
})

export default academicSemesterZodSchema