import type { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { badRequest } from '@/presentation/helpers'
import type { UpdateRuralProducer } from '@/domain/usecases'

export class UpdateRuralProducerController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly updateRuralProducer: UpdateRuralProducer
  ) {}

  async handle (request: UpdateRuralProducerController.Request): Promise<HttpResponse> {
    const error = this.validation.validate(request)
    if (error) {
      return badRequest(error)
    }
    const { id, cpfCnpj, name } = request
    await this.updateRuralProducer.update({ id, cpfCnpj, name })
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
