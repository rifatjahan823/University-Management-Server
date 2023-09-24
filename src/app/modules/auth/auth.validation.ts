import { z } from "zod";

const loginZodSchema=z.object({
    body:z.object({
        id:z.string({required_error:'Id is required'}),
        password:z.string({required_error:"Password is required"})
    })
})

const refreshTokenZodSchema=z.object({
    cookies:z.object({
        refreshtoken:z.string({required_error:'RefreshToken is required'})
    })
})

const changePasswordZodSchema=z.object({
    body:z.object({
        oldPassword:z.string({required_error:'Old password is required'}),
        newPassword:z.string({required_error:'New Password password is required'})
    })
})

export const authValidation={
    loginZodSchema,
    refreshTokenZodSchema,
    changePasswordZodSchema
}