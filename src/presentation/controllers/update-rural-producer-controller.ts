import type { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { badRequest, noContent, notFound, serverError } from '@/presentation/helpers'
import type { LoadRuralProducerById, UpdateFarm, UpdatePlantedCrops, UpdateRuralProducer } from '@/domain/usecases'

export class UpdateRuralProducerController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly loadRuralProducerById: LoadRuralProducerById,
    private readonly updateRuralProducer: UpdateRuralProducer,
    private readonly updateFarm: UpdateFarm,
    private readonly updatePlantedCrops: UpdatePlantedCrops
  ) {}

  async handle (request: UpdateRuralProducerController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }
      const { id, cpfCnpj, name, farmName, cityName, state, totalArea, agriculturalArea, vegetationArea, plantedCrops } = request
      const existsOnDatabase = await this.loadRuralProducerById.load(id)
      if (!existsOnDatabase) {
        return notFound()
      }
      await this.updateRuralProducer.update({ id, cpfCnpj, name })
      const farmId = await this.updateFarm.update({
        ruralProducerId: id,
        name: farmName,
        cityName,
        state,
        totalArea,
        agriculturalArea,
        vegetationArea
      })
      await this.updatePlantedCrops.update({ farmId, plantedCrops })
      return noContent()
    } catch (error) {
      return serverError(error as Error)
    }
  }
}

export namespace UpdateRuralProducerController {
  export type Request = {
    id: number
    cpfCnpj: string
    name: string
    farmName: string
    cityName: string
    state: string
    totalArea: number
    agriculturalArea: number
    vegetationArea: number
    plantedCrops: string[]
  }
}
