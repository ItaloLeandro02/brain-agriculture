import type { AddPlantedCropsRepository, DeletePlantedCropsRepository, UpdatePlantedCropsRepository } from '@/data/protocols'

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

export class DeletePlantedCropsRepositorySpy implements DeletePlantedCropsRepository {
  farmId: number

  async delete (farmId: number): Promise<void> {
    this.farmId = farmId
    await Promise.resolve()
  }
}
