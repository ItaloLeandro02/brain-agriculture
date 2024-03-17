import type { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { badRequest } from '@/presentation/helpers'
import type { UpdateFarm, UpdateRuralProducer } from '@/domain/usecases'

export class UpdateRuralProducerController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly updateRuralProducer: UpdateRuralProducer,
    private readonly updateFarm: UpdateFarm
  ) {}

  async handle (request: UpdateRuralProducerController.Request): Promise<HttpResponse> {
    const error = this.validation.validate(request)
    if (error) {
      return badRequest(error)
    }
    const { id, cpfCnpj, name, farmName, cityName, state, totalArea, agriculturalArea, vegetationArea } = request
    await this.updateRuralProducer.update({ id, cpfCnpj, name })
    await this.updateFarm.update({
      ruralProducerId: id,
      name: farmName,
      cityName,
      state,
      totalArea,
      agriculturalArea,
      vegetationArea
    })
    return await Promise.resolve(null)
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
