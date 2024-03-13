import type { AddRuralProducer } from '@/domain/usecases'

export class AddRuralProducerSpy implements AddRuralProducer {
  params: AddRuralProducer.Params

  async add (params: AddRuralProducer.Params): Promise<void> {
    this.params = params
  }
}
