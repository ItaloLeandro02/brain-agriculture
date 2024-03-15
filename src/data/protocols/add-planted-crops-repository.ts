import type { AddPlantedCrops } from '@/domain/usecases'

export interface AddPlantedCropsRepository {
  add: (params: AddPlantedCropsRepository.Params) => Promise<void>
}

export namespace AddPlantedCropsRepository {
  export type Params = AddPlantedCrops.Params
}
