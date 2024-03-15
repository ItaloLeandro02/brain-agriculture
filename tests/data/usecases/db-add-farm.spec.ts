import { faker } from '@faker-js/faker'
import { DbAddFarm } from '@/data/usecases'
import type { AddFarmRepository } from '@/data/protocols'
import { AddFarmRepositorySpy } from '@/tests/data/mocks'
import { throwError } from '@/tests/domain/mocks'

type SutTypes = {
  sut: DbAddFarm
  addFarmRepositorySpy: AddFarmRepositorySpy
}

const makeSut = (): SutTypes => {
  const addFarmRepositorySpy = new AddFarmRepositorySpy()
  const sut = new DbAddFarm(addFarmRepositorySpy)
  return {
    sut,
    addFarmRepositorySpy
  }
}

const mockParams = (): AddFarmRepository.Params => ({
  ruralProducerId: faker.number.int(),
  name: faker.company.name(),
  cityName: faker.location.city(),
  state: 'MG',
  totalArea: 300,
  agriculturalArea: 250,
  vegetationArea: 50
})

describe('DbAddFarm UseCase', () => {
  test('Deve chamar AddFarmRepository com os dados corretos', async () => {
    const { sut, addFarmRepositorySpy } = makeSut()
    const params = mockParams()
    await sut.add(params)
    expect(addFarmRepositorySpy.params).toEqual(params)
  })
  test('Deve retornar o id do fazenda cadastrada em caso de sucesso', async () => {
    const { sut, addFarmRepositorySpy } = makeSut()
    const newFarmId = await sut.add(mockParams())
    expect(newFarmId).toEqual(addFarmRepositorySpy.farmId)
  })
  test('Deve lançar uma exceção caso AddFarmRepository lance uma exceção', async () => {
    const { sut, addFarmRepositorySpy } = makeSut()
    jest.spyOn(addFarmRepositorySpy, 'add').mockImplementationOnce(throwError)
    const promise = sut.add(mockParams())
    await expect(promise).rejects.toThrow()
  })
})