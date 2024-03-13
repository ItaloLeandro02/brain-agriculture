import type { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { badRequest } from '@/presentation/helpers'
import type { AddFarm, AddPlantedCrops, AddRuralProducer } from '@/domain/usecases'

export class AddRuralProducerController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addRuralProducer: AddRuralProducer,
    private readonly addFarm: AddFarm,
    private readonly addPlantedCrops: AddPlantedCrops
  ) {}

  async handle (request: AddRuralProducerController.Request): Promise<HttpResponse> {
    const error = this.validation.validate(request)
    if (error) {
      return badRequest(new Error())
    }
    const { cpfCnpj, name, farmName, cityName, state, totalArea, agriculturalArea, vegetationArea, plantedCrops } = request
    const ruralProducerId = await this.addRuralProducer.add({ cpfCnpj, name })
    const farmId = await this.addFarm.add({
      ruralProducerId,
      name: farmName,
      cityName,
      state,
      totalArea,
      agriculturalArea,
      vegetationArea
    })
    await this.addPlantedCrops.add({ farmId, plantedCrops })
  }
}

export namespace AddRuralProducerController {
  export type Request = {
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
