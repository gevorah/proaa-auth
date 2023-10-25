import { IsEmail, IsString } from 'class-validator'

/**
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: 'object'
 *       properties:
 *         _id:
 *           type: string
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *         provider:
 *           type: string
 *         createdAt:
 *           type: string
 *         updatedAt:
 *           type: string
 */
type User = {
  _id: string
  name: string
  email: string
  password: string
  provider: string
  createdAt: string
  updatedAt: string
}

/**
 * @openapi
 * components:
 *   schemas:
 *     UserDto:
 *       type: 'object'
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 */
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
