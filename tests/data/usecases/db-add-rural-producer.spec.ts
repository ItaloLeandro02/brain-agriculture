import { DbAddRuralProducer } from '@/data/usecases'
import { AddRuralProducerRepositorySpy } from '@/tests/data/mocks'
import { mockAddRuralProducerParams, throwError } from '@/tests/domain/mocks'

type SutTypes = {
  sut: DbAddRuralProducer
  addRuralProducerRepositorySpy: AddRuralProducerRepositorySpy
}

const makeSut = (): SutTypes => {
  const addRuralProducerRepositorySpy = new AddRuralProducerRepositorySpy()
  const sut = new DbAddRuralProducer(addRuralProducerRepositorySpy)
  return {
    sut,
    addRuralProducerRepositorySpy
  }
}

describe('AddRuralProducer UseCase', () => {
  test('Deve chamar AddRuralProducerRepository com os dados corretos', async () => {
    const { sut, addRuralProducerRepositorySpy } = makeSut()
    const params = mockAddRuralProducerParams()
    await sut.add(params)
    expect(addRuralProducerRepositorySpy.params).toEqual(params)
  })
  test('Deve retornar o id do produtor rural cadastrado em caso de sucesso', async () => {
    const { sut, addRuralProducerRepositorySpy } = makeSut()
    const newRuralProducerId = await sut.add(mockAddRuralProducerParams())
    expect(newRuralProducerId).toEqual(addRuralProducerRepositorySpy.ruralProducerId)
  })
  test('Deve lançar uma exceção caso AddRuralProducerRepository lance uma exceção', async () => {
    const { sut, addRuralProducerRepositorySpy } = makeSut()
    jest.spyOn(addRuralProducerRepositorySpy, 'add').mockImplementationOnce(throwError)
    const promise = sut.add(mockAddRuralProducerParams())
    await expect(promise).rejects.toThrow()
  })
})
