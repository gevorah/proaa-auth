/**
 * @openapi
 * components:
 *   schemas:
 *     HttpError:
 *       type: 'object'
 *       properties:
 *         status:
 *           type: integer
 *         message:
 *           type: string
 */
class HttpError extends Error {
  status: number
  message: string

  constructor(status: number, message: string) {
    super(message)
    this.status = status
    this.message = message
  }
}

export default HttpError
