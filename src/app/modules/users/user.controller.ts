import { Request, Response } from "express";
import userService from "./user.service";

const creteControllerUser=async(req:Request,res:Response)=>{
    try {
        const {user}=req.body
        const result = await userService.createUser(user);
        res.status(200).json({
            success:true,
            message:"create user successfully",
            data:result
        })
    }catch(err){
        res.status(400).json({
            success:false,
            message:'fail to create user'
        })
    }
}

export default{
    creteControllerUser
}