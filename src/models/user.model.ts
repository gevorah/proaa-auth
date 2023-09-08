import { compare, hash } from 'bcrypt'
import { randomUUID } from 'crypto'
import { Model, Schema, model } from 'mongoose'

import type { User } from './user.dto'

type UserMethods = {
  comparePassword(password: string): Promise<boolean>
}

type UserModel = Model<User, {}, UserMethods>

const UserSchema = new Schema<User, UserModel, UserMethods>(
  {
    _id: { type: String, default: randomUUID, required: true },
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: { unique: true }
    },
    password: { type: String, required: true }
  },
  { collection: 'users', timestamps: true, versionKey: false }
)

UserSchema.pre('save', userPreSaveHook)
UserSchema.method('comparePassword', userComparePassword)

async function userPreSaveHook(this: any, next: () => void) {
  if (!this.isModified('password')) return next()
  this.password = await hash(this.password, 10)
  next()
}
async function userComparePassword(this: any, password: string) {
  return await compare(password, this.password)
}

export default model<User, UserModel>('User', UserSchema)
export { userPreSaveHook, userComparePassword }
