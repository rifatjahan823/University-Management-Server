import { Response } from "express"

type responseData<T>={
    statusCode:number;
    success:boolean;
    message?:string | null;
    data?:T | null
}
export const sendResponse=<T>(res:Response,data:responseData<T>):void=>{

    const reponseData:responseData<T>={
        statusCode:data.statusCode,
        success:data.success,
        message:data.message || null,
        data:data.data || null}
    
    res.status(data.statusCode).json(reponseData)
}