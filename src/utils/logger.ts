import { createLogger, format, transports } from 'winston'

import config from '../configs/general.config'

const { NODE_ENV } = config

const logFormat = format.combine(
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  format.colorize({ all: true }),
  format.printf(
    ({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`
  )
)

const logTransports = [
  new transports.Console(),
  new transports.File({
    level: 'debug',
    filename: 'logs/debug.log',
    zippedArchive: true
  }),
  new transports.File({
    level: 'error',
    filename: 'logs/error.log',
    zippedArchive: true
  })
]

const logger = createLogger({
  level: 'warn',
  format: logFormat,
  transports: logTransports
})

if (NODE_ENV === 'development') {
  logger.transports.forEach(transport => (transport.level = 'debug'))
}

if (NODE_ENV === 'test') {
  logger.transports.forEach(transport => (transport.level = 'warn'))
}

export default logger
