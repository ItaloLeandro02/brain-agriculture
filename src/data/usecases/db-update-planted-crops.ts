import type { UpdatePlantedCropsRepository } from '@/data/protocols'
import type { UpdatePlantedCrops } from '@/domain/usecases'

export class DbUpdatePlantedCrops implements UpdatePlantedCrops {
  constructor (private readonly updatePlantedCropsRepository: UpdatePlantedCropsRepository) {}

  async update (params: UpdatePlantedCropsRepository.Params): Promise<void> {
    await this.updatePlantedCropsRepository.update(params)
  }
}
