import { NextFunction, Request, Response } from "express";
import ApiError from "../../errors/ApiError";
import httpStatus from "http-status";
import { jwtHelpers } from "../../helpers/jwtHelpers";
import config from "../../config";
import { Secret } from "jsonwebtoken";


const auth=(...requiredRoles:string[])=>async(req:Request,res:Response,next:NextFunction)=>{
    try{
    //get authorization token
     const token=req.headers.authorization
     if(!token){
        throw new ApiError(httpStatus.UNAUTHORIZED,'You are authorized')
     }  
       //very token
       let verifieduser=null;
        verifieduser = jwtHelpers.verifyToken(token,config.jwt.refresh_secret as Secret)
        req.user=verifieduser

        //role diye guard korar jonno
        if(requiredRoles.length && !requiredRoles.includes(verifieduser.role)){
            throw new ApiError(httpStatus.FORBIDDEN,'Forbiden')
        }

       next()
    }catch(error){
        next(error)
    }
}

export default auth