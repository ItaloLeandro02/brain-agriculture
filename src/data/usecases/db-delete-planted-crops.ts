import type { DeletePlantedCropsRepository } from '@/data/protocols'
import type { DeletePlantedCrops } from '@/domain/usecases'

export class DbDeletePlantedCrops implements DeletePlantedCrops {
  constructor (private readonly deletePlantedCropsRepository: DeletePlantedCropsRepository) {}

  async delete (farmId: number): Promise<void> {
    await this.deletePlantedCropsRepository.delete(farmId)
  }
}
