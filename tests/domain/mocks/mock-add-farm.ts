import { faker } from '@faker-js/faker'
import type { AddFarm } from '@/domain/usecases'

export class AddFarmSpy implements AddFarm {
  params: AddFarm.Params
  farmId = faker.number.int()

  async add (params: AddFarm.Params): Promise<number> {
    this.params = params
    return await Promise.resolve(this.farmId)
  }
}
