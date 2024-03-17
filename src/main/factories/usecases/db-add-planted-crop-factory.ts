import { DbAddPlantedCrops } from '@/data/usecases'
import type { AddPlantedCrops } from '@/domain/usecases'
import { PlantedCropsPostgresRepository } from '@/infra/db/postgres'

export const makeDbAddPlantedCrops = (): AddPlantedCrops => {
  const plantedCropsPostgresRepository = new PlantedCropsPostgresRepository()
  return new DbAddPlantedCrops(plantedCropsPostgresRepository)
}
