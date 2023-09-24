import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { User } from "../users/user.model";
import { Secret } from 'jsonwebtoken';
import config from "../../../config";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import { ILoginUser, ILoginUserResponse, IRefreshTokenResponse } from "./auth.interface";

const createUser=async(payload:ILoginUser):Promise<ILoginUserResponse>=>{
    const {id,password}=payload;

    const user=new User()
    const isUserExist=await user.isUserExist(id)
    if(!isUserExist){
        throw new ApiError(httpStatus.NOT_FOUND,'user not exist')
    }
    const isPasswordMatch=await user.isPasswordMatch(password,isUserExist?.password)
    
if(!isPasswordMatch){
    throw new ApiError(httpStatus.UNAUTHORIZED,'Password not matched')
}
// if(isUserExist.password && !user.isPasswordMatch(password,isUserExist?.password)){
//     throw new ApiError(httpStatus.UNAUTHORIZED,'Password not matched')
// }

//create jwt token access token & refresh token
const{id:userId,role,needsPasswordChange}=isUserExist
const accessToken=jwtHelpers.createToken({userId,role},config.jwt.scret as Secret,config.jwt.expired_In as string)

const refreshToken=jwtHelpers.createToken({userId,role},config.jwt.refresh_secret as Secret,config.jwt.refresh_expired_In as string)

return{
    accessToken,refreshToken,needsPasswordChange
}

}

// -------------refreshToken--------------
const refreshToken=async(token:string):Promise<IRefreshTokenResponse>=>{
//verify token
let verifiedtoken=null;
try {
 verifiedtoken = jwtHelpers.verifyToken(token,config.jwt.refresh_secret as Secret)

  } catch(err) {
    throw new ApiError (httpStatus.FORBIDDEN,'Invalied Token')
  }
const {userId}=verifiedtoken
//user delete hole refrehtoken 
const user=new User()
const isUserExist=await user.isUserExist(userId)
if(!isUserExist){
    throw new ApiError(httpStatus.NOT_FOUND,'user does no exist')
}

//genarate new token
const newAccessToken=jwtHelpers.createToken({id:isUserExist.id,role:isUserExist.role},config.jwt.scret as Secret,config.jwt.expired_In as string)

return{
    accessToken:newAccessToken
}


}


// -------------change-password-----------
const changePassword=async()=>{

}


export const authService={
    createUser,
    refreshToken,
    changePassword
}