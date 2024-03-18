import { KnexHelper } from '@/infra/db/postgres/helpers'
import type { AddFarmRepository, UpdateFarmRepository } from '@/data/protocols'

export class FarmPostgresRepository implements AddFarmRepository, UpdateFarmRepository {
  async add (params: AddFarmRepository.Params): Promise<number> {
    const [result] = await KnexHelper.client
      .insert({
        rural_producer_id: params.ruralProducerId,
        name: params.name,
        city_name: params.cityName,
        state: params.state,
        total_area: params.totalArea,
        agricultural_area: params.agriculturalArea,
        vegetation_area: params.vegetationArea
      })
      .into('farm')
      .returning('id')
    return result.id
  }

  async update (params: UpdateFarmRepository.Params): Promise<number> {
    const [result] = await KnexHelper.client
      .update({
        name: params.name,
        city_name: params.cityName,
        state: params.state,
        total_area: params.totalArea,
        agricultural_area: params.agriculturalArea,
        vegetation_area: params.vegetationArea
      })
      .from('farm')
      .where('rural_producer_id', params.ruralProducerId)
      .returning('id')
    return result.id
  }
}
