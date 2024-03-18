import { faker } from '@faker-js/faker'
import type { AddFarmRepository, UpdateFarmRepository } from '@/data/protocols'
import { type UpdateFarm } from '@/domain/usecases'

export class AddFarmRepositorySpy implements AddFarmRepository {
  params: AddFarmRepository.Params
  farmId = faker.number.int({ min: 1, max: 100 })

  async add (params: AddFarmRepository.Params): Promise<number> {
    this.params = params
    return await Promise.resolve(this.farmId)
  }
}

export class UpdateFarmRepositorySpy implements UpdateFarmRepository {
  params: UpdateFarm.Params
  farmId = faker.number.int({ min: 1, max: 100 })

  async update (params: UpdateFarm.Params): Promise<number> {
    this.params = params
    return await Promise.resolve(this.farmId)
  }
}
