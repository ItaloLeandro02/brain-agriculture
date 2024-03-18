import { KnexHelper } from '@/infra/db/postgres/helpers'
import type { AddPlantedCropsRepository, DeletePlantedCropsRepository, UpdatePlantedCropsRepository } from '@/data/protocols'

export class PlantedCropsPostgresRepository implements AddPlantedCropsRepository, UpdatePlantedCropsRepository, DeletePlantedCropsRepository {
  async add (params: AddPlantedCropsRepository.Params): Promise<void> {
    const insertParams = params.plantedCrops.map((plantedCrop) => ({ farm_id: params.farmId, name: plantedCrop }))
    await KnexHelper.client
      .insert(insertParams)
      .into('planted_crop')
  }

  async update (params: UpdatePlantedCropsRepository.Params): Promise<void> {
    await this.delete(params.farmId)
    await this.add(params)
  }

  async delete (farmId: number): Promise<void> {
    await KnexHelper.client.delete().from('planted_crop').where('farm_id', farmId)
  }
}
