import type { AddPlantedCropsRepository } from '@/data/protocols'

export class AddPlantedCropsRepositorySpy implements AddPlantedCropsRepository {
  params: AddPlantedCropsRepository.Params

  async add (params: AddPlantedCropsRepository.Params): Promise<void> {
    this.params = params
    await Promise.resolve()
  }
}
