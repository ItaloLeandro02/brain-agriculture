import type { AddRuralProducer } from '@/domain/usecases'

export interface AddRuralProducerRepository {
  add: (params: AddRuralProducerRepository.Params) => Promise<number>
}

export namespace AddRuralProducerRepository {
  export type Params = AddRuralProducer.Params
}
