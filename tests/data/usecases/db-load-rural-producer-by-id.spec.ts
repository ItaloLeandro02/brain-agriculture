import { faker } from '@faker-js/faker'
import { DbLoadRuralProducerById } from '@/data/usecases'
import { LoadRuralProducerByIdRepositorySpy } from '@/tests/data/mocks'

type SutTypes = {
  sut: DbLoadRuralProducerById
  loadRuralProducerByIdRepositorySpy: LoadRuralProducerByIdRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadRuralProducerByIdRepositorySpy = new LoadRuralProducerByIdRepositorySpy()
  const sut = new DbLoadRuralProducerById(loadRuralProducerByIdRepositorySpy)
  return {
    sut,
    loadRuralProducerByIdRepositorySpy
  }
}

describe('DbLoadRuralProducerById UseCase', () => {
  test('Deve chamar LoadRuralProducerByIdRepository com os dados corretos', async () => {
    const { sut, loadRuralProducerByIdRepositorySpy } = makeSut()
    const ruralProducerId = faker.number.int({ min: 1, max: 100 })
    await sut.load(ruralProducerId)
    expect(loadRuralProducerByIdRepositorySpy.id).toEqual(ruralProducerId)
  })
})
