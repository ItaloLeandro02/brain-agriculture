import type { AddPlantedCropsRepository, UpdatePlantedCropsRepository } from '@/data/protocols'

export class AddPlantedCropsRepositorySpy implements AddPlantedCropsRepository {
  params: AddPlantedCropsRepository.Params

  async add (params: AddPlantedCropsRepository.Params): Promise<void> {
    this.params = params
    await Promise.resolve()
  }
}

export class UpdatePlantedCropsRepositorySpy implements UpdatePlantedCropsRepository {
  params: UpdatePlantedCropsRepository.Params

  async update (params: UpdatePlantedCropsRepository.Params): Promise<void> {
    this.params = params
    await Promise.resolve()
  }
}
