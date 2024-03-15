import type { AddFarmRepository } from '@/data/protocols'
import type { AddFarm } from '@/domain/usecases'

export class DbAddFarm implements AddFarm {
  constructor (private readonly addFarmRepository: AddFarmRepository) {}

  async add (params: AddFarm.Params): Promise<number> {
    await this.addFarmRepository.add(params)
    return -1
  }
}
