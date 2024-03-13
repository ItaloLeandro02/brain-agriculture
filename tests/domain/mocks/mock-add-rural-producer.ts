import { faker } from '@faker-js/faker'
import type { AddRuralProducer } from '@/domain/usecases'

export class AddRuralProducerSpy implements AddRuralProducer {
  params: AddRuralProducer.Params
  ruralProducerId = faker.number.int()

  async add (params: AddRuralProducer.Params): Promise<number> {
    this.params = params
    return await Promise.resolve(this.ruralProducerId)
  }
}
