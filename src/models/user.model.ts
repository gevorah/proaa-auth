import { hash } from 'bcrypt'
import { randomUUID } from 'crypto'
import { Schema, model } from 'mongoose'

import type { User } from './user.dto'

const UserSchema = new Schema<User>(
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

UserSchema.pre('save', async function (next) {
  const user = this
  if (!user.isModified('password')) {
    return next()
  }
  user.password = await hash(user.password, 10)
  next()
})

export const UserModel = model<User>('User', UserSchema)
