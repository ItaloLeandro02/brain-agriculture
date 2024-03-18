import { faker } from '@faker-js/faker'
import type { UpdateFarm } from '@/domain/usecases'

export class UpdateFarmSpy implements UpdateFarm {
  params: UpdateFarm.Params
  farmId = faker.number.int({ min: 1, max: 100 })

  async update (params: UpdateFarm.Params): Promise<number> {
    this.params = params
    return await Promise.resolve(this.farmId)
  }
}
