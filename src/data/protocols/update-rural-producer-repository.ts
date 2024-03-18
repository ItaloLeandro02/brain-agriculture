import type { UpdateRuralProducer } from '@/domain/usecases'

export interface UpdateRuralProducerRepository {
  update: (params: UpdateRuralProducerRepository.Params) => Promise<void>
}

export namespace UpdateRuralProducerRepository {
  export type Params = UpdateRuralProducer.Params
}
