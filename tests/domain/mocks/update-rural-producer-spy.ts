import type { UpdateRuralProducer } from '@/domain/usecases'

export class UpdateRuralProducerSpy implements UpdateRuralProducer {
  params: UpdateRuralProducer.Params

  async update (params: UpdateRuralProducer.Params): Promise<void> {
    this.params = params
    await Promise.resolve()
  }
}
