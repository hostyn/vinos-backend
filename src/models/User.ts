import mongoose, { Model } from 'mongoose'
import bcrypt from 'bcryptjs'

interface IUser {
  email: string
  password: string
}

interface UserModel extends Model<IUser> {
  encryptPassword(password: string): string
  comparePassword(passwrod: string, hash: string): boolean
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
  },
  { timestamps: true, versionKey: false }
)

userSchema.statics.encryptPassword = password => {
  const salt = bcrypt.genSaltSync()
  return bcrypt.hashSync(password, salt)
}

userSchema.statics.comparePassword = (password, hash) => {
  return bcrypt.compareSync(password, hash)
}

export default mongoose.model<IUser, UserModel>('User', userSchema)
