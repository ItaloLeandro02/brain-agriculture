import type { HttpResponse } from '@/presentation/protocols'
import { NotFoundError, ServerError } from '@/presentation/errors'

export const noContent = (): HttpResponse => ({
  statusCode: 204,
  body: null
})
export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error
})
export const notFound = (): HttpResponse => ({
  statusCode: 404,
  body: new NotFoundError()
})
export const serverError = (error: Error): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(error.stack)
})
