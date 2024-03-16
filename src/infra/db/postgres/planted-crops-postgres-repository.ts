import { KnexHelper } from '@/infra/db/postgres/helpers'
import type { AddPlantedCropsRepository } from '@/data/protocols'

export class PlantedCropsPostgresRepository implements AddPlantedCropsRepository {
  async add (params: AddPlantedCropsRepository.Params): Promise<void> {
    const insertParams = params.plantedCrops.map((plantedCrop) => ({ farm_id: params.farmId, name: plantedCrop }))
    await KnexHelper.client
      .insert(insertParams)
      .into('planted_crop')
  }
}
