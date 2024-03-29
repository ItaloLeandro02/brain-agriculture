import { faker } from '@faker-js/faker'
import { DbDeleteRuralProducer } from '@/data/usecases'
import { DeleteRuralProducerRepositorySpy } from '@/tests/data/mocks'
import { throwError } from '@/tests/domain/mocks'

type SutTypes = {
  sut: DbDeleteRuralProducer
  deleteRuralProducerRepositorySpy: DeleteRuralProducerRepositorySpy
}

const makeSut = (): SutTypes => {
  const deleteRuralProducerRepositorySpy = new DeleteRuralProducerRepositorySpy()
  const sut = new DbDeleteRuralProducer(deleteRuralProducerRepositorySpy)
  return {
    sut,
    deleteRuralProducerRepositorySpy
  }
}

describe('DbDeleteRuralProducer UserCase', () => {
  test('Deve chamar DeleteRuralProducerRepository com os dados corretos', async () => {
    const { sut, deleteRuralProducerRepositorySpy } = makeSut()
    const ruralProducerId = faker.number.int({ min: 1, max: 100 })
    await sut.delete(ruralProducerId)
    expect(deleteRuralProducerRepositorySpy.id).toBe(ruralProducerId)
  })
  test('Deve lançar uma exceção caso DeleteRuralProducerRepository lance uma exceção', async () => {
    const { sut, deleteRuralProducerRepositorySpy } = makeSut()
    jest.spyOn(deleteRuralProducerRepositorySpy, 'delete').mockImplementationOnce(throwError)
    const promise = sut.delete(faker.number.int({ min: 1, max: 100 }))
    await expect(promise).rejects.toThrow()
  })
})
