import config from '../../../config'
import ApiError from '../../../errors/ApiError'
import { IUser } from './user.interface'
import { User } from './user.model'
import { genarateUserId } from './user.utils'

const createUser = async (user: IUser): Promise<IUser | null> => {
  //auto genarated incremental id
  const id = await genarateUserId()
  user.id = id
  //defult password
  if (!user.password) {
    user.password = config.defult_user_password as string
  }
  const createdUser = await User.create(user)
  if (!createdUser) {
 throw new ApiError(400,'User not created')
  }
  return createdUser
}

export const service= {
  createUser,
}
