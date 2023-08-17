import ApiError from "../../../errors/ApiError"
import { AcademicTitleCodemapping } from "./academicSemester.Constance"
import { IAcademicSemester } from "./academicSemester.interface"
import { AcademicSemester } from "./academicSemester.model"
import status from 'http-status'

const createAcademicSemester=async(academicSemester:IAcademicSemester):Promise<IAcademicSemester>=>{
    if(AcademicTitleCodemapping[academicSemester.title]!==academicSemester.code){
        throw new ApiError(400,'Title and Code not match')
    }
    const createAcademicService=await AcademicSemester.create(academicSemester)
    if(!createAcademicService){
        throw new ApiError(status.BAD_REQUEST,'AcademicSemester not Creted')
    }
    return createAcademicService
}
export const academicSemesterService={
    createAcademicSemester
}