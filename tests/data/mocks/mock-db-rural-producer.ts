import { faker } from '@faker-js/faker'
import type { AddRuralProducerRepository } from '@/data/protocols'

export class AddRuralProducerRepositorySpy implements AddRuralProducerRepository {
  params: AddRuralProducerRepository.Params
  ruralProducerId = faker.number.int()

  async add (params: AddRuralProducerRepository.Params): Promise<number> {
    this.params = params
    return await Promise.resolve(this.ruralProducerId)
  }
}
