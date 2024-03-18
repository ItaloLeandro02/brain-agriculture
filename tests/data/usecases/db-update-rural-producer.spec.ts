import { DbUpdateRuralProducer } from '@/data/usecases'
import { UpdateRuralProducerRepositorySpy } from '@/tests/data/mocks'
import { mockUpdateRuralProducerParams, throwError } from '@/tests/domain/mocks'

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
  test('Deve lançar uma exceção caso UpdateRuralProducerRepository lance uma exceção', async () => {
    const { sut, updateRuralProducerRepositorySpy } = makeSut()
    jest.spyOn(updateRuralProducerRepositorySpy, 'update').mockImplementationOnce(throwError)
    const promise = sut.update(mockUpdateRuralProducerParams())
    await expect(promise).rejects.toThrow()
  })
})
