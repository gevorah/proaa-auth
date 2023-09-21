import HttpError from './http.error'

class InvalidCredentials extends HttpError {
  constructor() {
    super(401, 'Incorrect email or password')
  }
}

export { InvalidCredentials }
