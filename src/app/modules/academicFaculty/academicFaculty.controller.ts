import { Request, Response } from "express";
import { catchAsync } from "../../../shared/catchAsync";
import { facultyService } from "./academicFaculty.service";
import { sendResponse } from "../../../shared/sendResponse";
import httpStatus from "http-status";
import pick from "../../../shared/pick";
import {academicFacultyFilterableField} from './academicFaculty.constance'
import { paginationFiled } from "../../../constance/pagination";
import { IAcademicFaculty } from "./academicFaculty.interface";

const createFaculty=catchAsync(async(req:Request,res:Response)=>{
    const {...facultyData}=req.body
    const result=await facultyService.createFaculty(facultyData)

    sendResponse<IAcademicFaculty>(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"Faculty Creted Successfully",
        data:result
    })
})


// ---------------------------GetAllFaculty---------------------------
// ----------------------------*********************---------------------------

const getAllFaculty=(async(req:Request,res:Response)=>{
const filter=pick(req.query,academicFacultyFilterableField)
const paginationOptions=pick(req.query,paginationFiled)
const result=await facultyService.getAllFaculty(filter,paginationOptions)

sendResponse<IAcademicFaculty[]>(res,{
    statusCode:httpStatus.OK,
    success:true,
    message:'Got All Faculty Data',
    meta:result.meta,
    data:result.data
})
})


//------------------get Singlefacult-----------------
// ---------------------********************-------------------
const getsingleFaculty=catchAsync(async(req:Request,res:Response)=>{
    const {id}=req.params
    const result=await facultyService.getsingleFaculty(id)
    sendResponse<IAcademicFaculty>(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"Got Single Faculty",
        data:result
    })
})


//-------------------update faculty--------------
// -----------------------****************-----------------
const updateFaculty=catchAsync(async(req:Request,res:Response)=>{
const {id}=req.params
const updatedData=req.body
const result=await facultyService.updateFaculty(id,updatedData)
sendResponse(res,{
    statusCode:httpStatus.OK,
    success:true,
    message:'Update Faculty',
    data:result
})
})


//---------------dalete faculty---------------
//------------------***********************--------------
const deleteFaculty=catchAsync(async(req:Request,res:Response)=>{
const id=req.params.id
const result=facultyService.deleteFaculty(id)
sendResponse(res,{
    statusCode:httpStatus.OK,
    success:true,
    message:'Delete Faculty',
    data:result
})
})


export const facultyController={
    createFaculty,
    getAllFaculty,
    getsingleFaculty,
    updateFaculty,
    deleteFaculty
}