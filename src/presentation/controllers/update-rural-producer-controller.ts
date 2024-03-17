import type { Controller, HttpResponse, Validation } from '@/presentation/protocols'

export class UpdateRuralProducerController implements Controller {
  constructor (private readonly validation: Validation) {}

  async handle (request: UpdateRuralProducerController.Request): Promise<HttpResponse> {
    this.validation.validate(request)
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
