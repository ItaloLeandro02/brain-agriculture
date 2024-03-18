import type { UpdatePlantedCrops } from '@/domain/usecases'

export interface UpdatePlantedCropsRepository {
  update: (params: UpdatePlantedCropsRepository.Params) => Promise<void>
}

export namespace UpdatePlantedCropsRepository {
  export type Params = UpdatePlantedCrops.Params
}
