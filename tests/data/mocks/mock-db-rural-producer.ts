import { faker } from '@faker-js/faker'
import type { AddRuralProducerRepository, UpdateRuralProducerRepository } from '@/data/protocols'

export class AddRuralProducerRepositorySpy implements AddRuralProducerRepository {
  params: AddRuralProducerRepository.Params
  ruralProducerId = faker.number.int()

  async add (params: AddRuralProducerRepository.Params): Promise<number> {
    this.params = params
    return await Promise.resolve(this.ruralProducerId)
  }
}

export class UpdateRuralProducerRepositorySpy implements UpdateRuralProducerRepository {
  params: UpdateRuralProducerRepository.Params

  async update (params: UpdateRuralProducerRepository.Params): Promise<void> {
    this.params = params
    await Promise.resolve()
  }
}
