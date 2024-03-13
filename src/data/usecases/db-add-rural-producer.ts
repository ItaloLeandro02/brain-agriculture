import type { AddRuralProducerRepository } from '@/data/protocols'
import type { AddRuralProducer } from '@/domain/usecases'

export class DbAddRuralProducer implements AddRuralProducer {
  constructor (private readonly addRuralProducerRepository: AddRuralProducerRepository) {}

  async add (params: AddRuralProducer.Params): Promise<number> {
    return await this.addRuralProducerRepository.add(params)
  }
}
