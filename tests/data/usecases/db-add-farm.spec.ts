import { DbAddFarm } from '@/data/usecases'
import { AddFarmRepositorySpy } from '@/tests/data/mocks'
import { mockAddFarmParams, throwError } from '@/tests/domain/mocks'

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

describe('DbAddFarm UseCase', () => {
  test('Deve chamar AddFarmRepository com os dados corretos', async () => {
    const { sut, addFarmRepositorySpy } = makeSut()
    const params = mockAddFarmParams()
    await sut.add(params)
    expect(addFarmRepositorySpy.params).toEqual(params)
  })
  test('Deve retornar o id do fazenda cadastrada em caso de sucesso', async () => {
    const { sut, addFarmRepositorySpy } = makeSut()
    const newFarmId = await sut.add(mockAddFarmParams())
    expect(newFarmId).toEqual(addFarmRepositorySpy.farmId)
  })
  test('Deve lançar uma exceção caso AddFarmRepository lance uma exceção', async () => {
    const { sut, addFarmRepositorySpy } = makeSut()
    jest.spyOn(addFarmRepositorySpy, 'add').mockImplementationOnce(throwError)
    const promise = sut.add(mockAddFarmParams())
    await expect(promise).rejects.toThrow()
  })
})
