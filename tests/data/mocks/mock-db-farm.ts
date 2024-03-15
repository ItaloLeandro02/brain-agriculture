import { faker } from '@faker-js/faker'
import type { AddFarmRepository } from '@/data/protocols'

export class AddFarmRepositorySpy implements AddFarmRepository {
  params: AddFarmRepository.Params
  farmId = faker.number.int()

  async add (params: AddFarmRepository.Params): Promise<number> {
    this.params = params
    return await Promise.resolve(this.farmId)
  }
}
