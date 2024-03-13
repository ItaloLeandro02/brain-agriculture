import type { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { badRequest } from '@/presentation/helpers'

export class AddRuralProducerController implements Controller {
  constructor (private readonly validation: Validation) {}

  async handle (request: AddRuralProducerController.Request): Promise<HttpResponse> {
    this.validation.validate(request)
    return await Promise.resolve(badRequest(new Error()))
  }
}

export namespace AddRuralProducerController {
  export type Request = {
    cpfCnpj: string
  }
}
