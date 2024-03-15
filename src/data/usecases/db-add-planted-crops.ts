import type { AddPlantedCropsRepository } from '@/data/protocols'
import type { AddPlantedCrops } from '@/domain/usecases'

export class DbAddPlantedCrops implements AddPlantedCrops {
  constructor (private readonly addPlantedCropsRepository: AddPlantedCropsRepository) {}

  async add (params: AddPlantedCrops.Params): Promise<void> {
    await this.addPlantedCropsRepository.add(params)
  }
}
