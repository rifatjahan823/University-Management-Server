import { Schema, model } from 'mongoose';
import { IUser, IUserMethods, UserModel } from './user.interface';
import config from '../../../config';
import bcrypt from 'bcrypt';



// 2. Create a Schema corresponding to the document interface.
const userSchema = new Schema<IUser,UserModel, IUserMethods>(
  {
    id: { type: String, required: true, unique: true },
    role: { type: String, required: true },
    password: { type: String, required: true,select:0 },
    needsPasswordChange:{type:Boolean,default:true},
    student: { type: Schema.Types.ObjectId, ref: 'Student' },
    faculty: { type: Schema.Types.ObjectId, ref: 'Faculty' },
    admin: { type: Schema.Types.ObjectId, ref: 'Admin' },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

userSchema.methods.isUserExist=async function (id:string):Promise<Partial<IUser>|null> {
  const user=await User.findOne({id},{id:1,password:1,needsPasswordChange:1,role:1});
  return user
}

userSchema.methods.isPasswordMatch=async function (givenPassword:string,savePassword:string):Promise<boolean> {
  const isMatched= await bcrypt.compare(givenPassword,savePassword);
  return isMatched
}

userSchema.pre('save', async function (next) {
  //has password korte hobe
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcript_salt_round),
  );
  next();
});

// 3. Create a Model.
export const User = model<IUser, UserModel>('User', userSchema);
