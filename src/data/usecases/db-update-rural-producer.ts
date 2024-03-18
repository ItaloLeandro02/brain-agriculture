import type { UpdateRuralProducerRepository } from '@/data/protocols'
import type { UpdateRuralProducer } from '@/domain/usecases'

export class DbUpdateRuralProducer implements UpdateRuralProducer {
  constructor (private readonly updateRuralProducerRepository: UpdateRuralProducerRepository) {}

  async update (params: UpdateRuralProducer.Params): Promise<void> {
    await this.updateRuralProducerRepository.update(params)
  }
}
