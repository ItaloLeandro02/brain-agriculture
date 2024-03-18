import type { Controller, HttpResponse } from '@/presentation/protocols'
import { serverError } from '@/presentation/helpers'
import type { LoadRuralProducerByIdRepository } from '@/data/protocols'

export class DeleteRuralProducerController implements Controller {
  constructor (private readonly loadRuralProducerByIdRepository: LoadRuralProducerByIdRepository) {}

  async handle (request: any): Promise<HttpResponse> {
    try {
      await this.loadRuralProducerByIdRepository.load(request.id)
      return null
    } catch (error) {
      return serverError(error as Error)
    }
  }
}

export namespace DeleteRuralProducerController {
  export type Request = {
    id: number
  }
}
