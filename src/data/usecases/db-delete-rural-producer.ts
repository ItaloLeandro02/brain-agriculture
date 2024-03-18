import type { DeleteRuralProducerRepository } from '@/data/protocols'
import type { DeleteRuralProducer } from '@/domain/usecases'

export class DbDeleteRuralProducer implements DeleteRuralProducer {
  constructor (private readonly deleteRuralProducerRepository: DeleteRuralProducerRepository) {}

  async delete (id: number): Promise<void> {
    await this.deleteRuralProducerRepository.delete(id)
  }
}
