import { hash } from 'bcrypt'
import { Schema, model } from 'mongoose'

type User = {
  name: string
  email: string
  password: string
}

const userSchema = new Schema<User>(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      trim: true,
      index: { unique: true }
    },
    password: { type: String, required: true }
  },
  { timestamps: true, versionKey: false }
)

userSchema.pre('save', async function (next) {
  const user = this
  if (!user.isModified('password')) {
    return next()
  }
  user.password = await hash(user.password, 10)
  next()
})

export default model<User>('User', userSchema)
