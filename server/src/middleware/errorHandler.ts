import { Request, Response } from 'express'
import logger from '../utils/logger'

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
): void => {
  const statusCode = (error as any).statusCode || 500


  logger.error('❌ Error Handler Caught an Error', {
    name: error.name,
    message: error.message,
    stack: error.stack,
    statusCode,
    url: req.originalUrl,
    method: req.method,
    body: req.body,
    ip: req.ip,
  })

  const response = {
    status: 'error',
    message: error.message || 'Internal server error',
    name: error.name,
    ...(process.env.NODE_ENV !== 'production' && { stack: error.stack }),

  }


  res.status(statusCode).json(response)
}
