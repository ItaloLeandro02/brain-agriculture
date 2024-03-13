import type { AddPlantedCrops } from '@/domain/usecases'

export class AddPlantedCropsSpy implements AddPlantedCrops {
  params: AddPlantedCrops.Params

  async add (params: AddPlantedCrops.Params): Promise<void> {
    this.params = params
  }
}
