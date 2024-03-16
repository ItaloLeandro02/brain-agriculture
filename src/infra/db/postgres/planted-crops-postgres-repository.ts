import { KnexHelper } from '@/infra/db/postgres/helpers'
import type { AddPlantedCropsRepository } from '@/data/protocols'

export class PlantedCropsPostgresRepository implements AddPlantedCropsRepository {
  async add (params: AddPlantedCropsRepository.Params): Promise<void> {
    const ruralProducerTable = KnexHelper.getInstance('planted_crop')
    const insertParams = params.plantedCrops.map((plantedCrop) => ({ farm_id: params.farmId, name: plantedCrop }))
    await ruralProducerTable
      .insert(insertParams)
  }
}
