import { DbDeletePlantedCrops } from '@/data/usecases'
import type { DeletePlantedCrops } from '@/domain/usecases'
import { PlantedCropsPostgresRepository } from '@/infra/db/postgres'

export const makeDbDeletePlantedCrops = (): DeletePlantedCrops => {
  const plantedCropsPostgresRepository = new PlantedCropsPostgresRepository()
  return new DbDeletePlantedCrops(plantedCropsPostgresRepository)
}
