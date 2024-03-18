import type { LoadRuralProducerByIdRepository } from '@/data/protocols'
import type { LoadRuralProducerById } from '@/domain/usecases'

export class DbLoadRuralProducerById implements LoadRuralProducerById {
  constructor (private readonly loadRuralProducerByIdRepository: LoadRuralProducerByIdRepository) {}

  async load (id: number): Promise<boolean> {
    return await this.loadRuralProducerByIdRepository.load(id)
  }
}
