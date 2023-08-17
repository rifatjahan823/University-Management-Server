import { NextFunction, Request, Response } from "express";
import { academicSemesterService } from "./academicSemester.service";
import { catchAsync } from "../../../shared/catchAsync";
import { sendResponse } from "../../../shared/sendresponse";
import httpStatus from "http-status";

const academicController=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
    const {...academicSemesterData}=req.body
    const controllerRequest=await academicSemesterService.createAcademicSemester(academicSemesterData)

    next()
    // res.status(200).json({
    //     success:true,
    //     message:'Academic Semester Successfully Created',
    //     data:controllerRequest
    // })
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:'Academic Semester Successfully Created',
        data:controllerRequest
    })

})

export const AcademicController={
    academicController
}