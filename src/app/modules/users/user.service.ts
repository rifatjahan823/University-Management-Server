import { User } from "./user.model";

export const userService =async()=>{
    const user = new User({
       id: 'Rifat',
        role: 'student',
        password:"12345"
      });
      await user.save();
}