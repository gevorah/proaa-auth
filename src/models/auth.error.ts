import HttpError from './http.error'

class SignInError extends HttpError {
  constructor() {
    super(401, 'Incorrect email or password')
  }
}

export { SignInError }
