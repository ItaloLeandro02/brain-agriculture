import type { Controller, HttpResponse } from '@/presentation/protocols'
import type { LoadRuralProducerByIdRepository } from '@/data/protocols'

export class DeleteRuralProducerController implements Controller {
  constructor (private readonly loadRuralProducerByIdRepository: LoadRuralProducerByIdRepository) {}

  async handle (request: any): Promise<HttpResponse> {
    await this.loadRuralProducerByIdRepository.load(request.id)
    return null
  }
}

export namespace DeleteRuralProducerController {
  export type Request = {
    id: number
  }
}
