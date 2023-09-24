import { Request, Response } from "express";
import { catchAsync } from "../../../shared/catchAsync";
import { sendResponse } from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { authService } from "./auth.service";
import { ILoginUserResponse, IRefreshTokenResponse } from "./auth.interface";
import config from "../../../config";

const loginUser=catchAsync(async(req:Request,res:Response)=>{
    const {...loginData}=req.body
    const result=await authService.createUser(loginData)

    const {refreshToken,...others}=result

    //set refresh token into cookie
    const cookieOption={
        secure:config.node_env==='production',
        httpOnly:true
    }
    res.cookie('refreshtoken',refreshToken,cookieOption)


    sendResponse<ILoginUserResponse>(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"User Login Successfully",
        data:others
    })
})

// -------------refreshToken----------------
const refreshToken=catchAsync(async(req:Request,res:Response)=>{
    const {refreshtoken}=req.cookies
    const result=await authService.refreshToken(refreshtoken)
    //set refresh token into cookie
    const cookieOption={
        secure:config.node_env==='production',
        httpOnly:true
    }
    res.cookie('refreshtoken',refreshToken,cookieOption)

    sendResponse<IRefreshTokenResponse>(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"User Login Successfully",
        data:result
    }) 
})


// -----------------change-password---------------
const changePassword=catchAsync(async(req:Request,res:Response)=>{
    const user=req.user
    const {...passwordData}=req.body
    const result=await authService.changePassword(user,passwordData)


    sendResponse<ILoginUserResponse>(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"Password Change Successfully",
        data:result
    })
})

export const authController={
    loginUser,
    refreshToken,
    changePassword
}