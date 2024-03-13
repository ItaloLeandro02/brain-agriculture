import type { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { badRequest } from '@/presentation/helpers'
import type { AddRuralProducer } from '@/domain/usecases'

export class AddRuralProducerController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addRuralProducer: AddRuralProducer
  ) {}

  async handle (request: AddRuralProducerController.Request): Promise<HttpResponse> {
    const error = this.validation.validate(request)
    if (error) {
      return badRequest(new Error())
    }
    await this.addRuralProducer.add(request)
  }
}

export namespace AddRuralProducerController {
  export type Request = {
    cpfCnpj: string
    name: string
  }
}
