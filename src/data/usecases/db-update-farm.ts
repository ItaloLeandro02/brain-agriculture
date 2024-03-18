import type { UpdateFarmRepository } from '@/data/protocols'
import type { UpdateFarm } from '@/domain/usecases'

export class DbUpdateFarm implements UpdateFarm {
  constructor (private readonly updateFarmRepository: UpdateFarmRepository) {}

  async update (params: UpdateFarm.Params): Promise<number> {
    return await this.updateFarmRepository.update(params)
  }
}
