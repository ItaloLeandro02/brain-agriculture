import type { Controller, HttpResponse } from '@/presentation/protocols'
import { noContent, notFound, serverError } from '@/presentation/helpers'
import type { DeleteFarm, DeletePlantedCrops, DeleteRuralProducer } from '@/domain/usecases'
import type { LoadRuralProducerByIdRepository } from '@/data/protocols'

export class DeleteRuralProducerController implements Controller {
  constructor (
    private readonly loadRuralProducerByIdRepository: LoadRuralProducerByIdRepository,
    private readonly deleteRuralProducer: DeleteRuralProducer,
    private readonly deleteFarm: DeleteFarm,
    private readonly deletePlantedCrops: DeletePlantedCrops
  ) {}

  async handle (request: any): Promise<HttpResponse> {
    try {
      const exists = await this.loadRuralProducerByIdRepository.load(request.id)
      if (!exists) {
        return notFound()
      }
      await this.deleteRuralProducer.delete(request.id)
      const farmId = await this.deleteFarm.delete(request.id)
      await this.deletePlantedCrops.delete(farmId)
      return noContent()
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
