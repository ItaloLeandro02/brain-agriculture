import { faker } from '@faker-js/faker'
import { DbAddRuralProducer } from '@/data/usecases'
import type { AddRuralProducer } from '@/domain/usecases'
import { AddRuralProducerRepositorySpy } from '@/tests/data/mocks'

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

const mockParams = (): AddRuralProducer.Params => ({
  cpfCnpj: '852.415.280-08',
  name: faker.person.fullName()
})

describe('AddRuralProducer UseCase', () => {
  test('Deve chamar AddRuralProducerRepository com os dados corretos', async () => {
    const { sut, addRuralProducerRepositorySpy } = makeSut()
    const params = mockParams()
    await sut.add(params)
    expect(addRuralProducerRepositorySpy.params).toEqual(params)
  })
  test('Deve retornar o id do produtor rural cadastrado em caso de sucesso', async () => {
    const { sut, addRuralProducerRepositorySpy } = makeSut()
    const newRuralProducerId = await sut.add(mockParams())
    expect(newRuralProducerId).toEqual(addRuralProducerRepositorySpy.ruralProducerId)
  })
})
