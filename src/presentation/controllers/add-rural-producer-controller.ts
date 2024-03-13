import type { Controller, HttpResponse, Validation } from '@/presentation/protocols'

export class AddRuralProducerController implements Controller {
  constructor (private readonly validation: Validation) {}

  async handle (request: AddRuralProducerController.Request): Promise<HttpResponse> {
    this.validation.validate(request)
    return await Promise.resolve({
      statusCode: 200,
      body: {}
    })
  }
}

export namespace AddRuralProducerController {
  export type Request = {
    cpfCnpj: string
  }
}
