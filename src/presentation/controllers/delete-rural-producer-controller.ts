import type { Controller, HttpResponse } from '@/presentation/protocols'
import { notFound, serverError } from '@/presentation/helpers'
import type { DeleteRuralProducer } from '@/domain/usecases'
import type { LoadRuralProducerByIdRepository } from '@/data/protocols'

export class DeleteRuralProducerController implements Controller {
  constructor (
    private readonly loadRuralProducerByIdRepository: LoadRuralProducerByIdRepository,
    private readonly deleteRuralProducer: DeleteRuralProducer
  ) {}

  async handle (request: any): Promise<HttpResponse> {
    try {
      const exists = await this.loadRuralProducerByIdRepository.load(request.id)
      if (!exists) {
        return notFound()
      }
      await this.deleteRuralProducer.delete(request.id)
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
