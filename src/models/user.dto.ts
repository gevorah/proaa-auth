import { IsEmail, IsString } from 'class-validator'

type User = {
  _id: string
  name: string
  email: string
  password: string
  createdAt: string
  updatedAt: string
}

class UserDto implements Pick<User, 'name' | 'email' | 'password'> {
  @IsString()
  name: string
  @IsEmail()
  email: string
  @IsString()
  password: string

  constructor(name: string, email: string, password: string) {
    this.name = name
    this.email = email
    this.password = password
  }
}

export type { User }
export { UserDto }
