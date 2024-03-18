import type { UpdatePlantedCrops } from '@/domain/usecases'

export class UpdatePlantedCropsSpy implements UpdatePlantedCrops {
  params: UpdatePlantedCrops.Params

  async update (params: UpdatePlantedCrops.Params): Promise<void> {
    this.params = params
    await Promise.resolve()
  }
}
