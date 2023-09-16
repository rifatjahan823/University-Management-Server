import { Schema, model } from 'mongoose';
import { IUser, UserModel } from './user.interface';
import config from '../../../config';
import bcrypt from 'bcrypt'

// Create a new Model type that knows about IUserMethods...

// 2. Create a Schema corresponding to the document interface.
const userSchema = new Schema<IUser>(
  {
    id: { type: String, required: true, unique: true },
    role: { type: String, required: true },
    password: { type: String, required: true },
    student: { type: Schema.Types.ObjectId, ref: 'Student' },
    faculty: { type: Schema.Types.ObjectId, ref: 'Faculty' },
    admin: { type: Schema.Types.ObjectId, ref: 'Admin' },
  },
  {
    timestamps: true,
    toJSON:{
      virtuals:true
    }
  },
);

userSchema.pre('save',async function(next) {
//has password korte hobe 
this.password=await bcrypt.hash(this.password,Number(config.bcript_salt_round))
next()
})


// 3. Create a Model.
export const User = model<IUser, UserModel>('User', userSchema);
