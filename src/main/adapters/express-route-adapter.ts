import type { Request, Response } from 'express'
import type { Controller } from '@/presentation/protocols'

export const adaptRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const request = {
      ...(req.body || {}),
      ...(req.params || {})
    }
    const httpResponse = await controller.handle(request)

    res.status(httpResponse.statusCode).json(
      httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299
        ? httpResponse.body
        : { error: httpResponse.body.message }
    )
  }
}
