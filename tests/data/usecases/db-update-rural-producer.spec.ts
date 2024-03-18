import { DbUpdateRuralProducer } from '@/data/usecases'
import { UpdateRuralProducerRepositorySpy } from '@/tests/data/mocks'
import { mockUpdateRuralProducerParams } from '@/tests/domain/mocks'

type SutTypes = {
  sut: DbUpdateRuralProducer
  updateRuralProducerRepositorySpy: UpdateRuralProducerRepositorySpy
}

const makeSut = (): SutTypes => {
  const updateRuralProducerRepositorySpy = new UpdateRuralProducerRepositorySpy()
  const sut = new DbUpdateRuralProducer(updateRuralProducerRepositorySpy)
  return {
    sut,
    updateRuralProducerRepositorySpy
  }
}

describe('DbUpdateRuralProducer UseCase', () => {
  test('Deve chamar UpdateRuralProducerRepository com os dados corretos', async () => {
    const { sut, updateRuralProducerRepositorySpy } = makeSut()
    const params = mockUpdateRuralProducerParams()
    await sut.update(params)
    expect(updateRuralProducerRepositorySpy.params).toEqual(params)
  })
})
