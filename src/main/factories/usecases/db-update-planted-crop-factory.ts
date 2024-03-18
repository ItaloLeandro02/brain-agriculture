import { DbUpdatePlantedCrops } from '@/data/usecases'
import type { UpdatePlantedCrops } from '@/domain/usecases'
import { PlantedCropsPostgresRepository } from '@/infra/db/postgres'

export const makeDbUpdatePlantedCrops = (): UpdatePlantedCrops => {
  const plantedCropsPostgresRepository = new PlantedCropsPostgresRepository()
  return new DbUpdatePlantedCrops(plantedCropsPostgresRepository)
}
