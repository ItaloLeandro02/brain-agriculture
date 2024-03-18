import { DbUpdateFarm } from '@/data/usecases'
import { mockUpdateFarmParams, throwError } from '@/tests/domain/mocks'
import { UpdateFarmRepositorySpy } from '@/tests/data/mocks'

type SutTypes = {
  sut: DbUpdateFarm
  updateFarmRepositorySpy: UpdateFarmRepositorySpy
}

const makeSut = (): SutTypes => {
  const updateFarmRepositorySpy = new UpdateFarmRepositorySpy()
  const sut = new DbUpdateFarm(updateFarmRepositorySpy)
  return {
    sut,
    updateFarmRepositorySpy
  }
}

describe('DbUpdateFarm UseCase', () => {
  test('Deve chamar UpdateFarmRepository com os dados corretos', async () => {
    const { sut, updateFarmRepositorySpy } = makeSut()
    const params = mockUpdateFarmParams()
    await sut.update(params)
    expect(updateFarmRepositorySpy.params).toEqual(params)
  })
  test('Deve retornar o id do fazenda atualizada em caso de sucesso', async () => {
    const { sut, updateFarmRepositorySpy } = makeSut()
    const newFarmId = await sut.update(mockUpdateFarmParams())
    expect(newFarmId).toEqual(updateFarmRepositorySpy.farmId)
  })
  test('Deve lançar uma exceção caso UpdateFarmRepository lance uma exceção', async () => {
    const { sut, updateFarmRepositorySpy } = makeSut()
    jest.spyOn(updateFarmRepositorySpy, 'update').mockImplementationOnce(throwError)
    const promise = sut.update(mockUpdateFarmParams())
    await expect(promise).rejects.toThrow()
  })
})
