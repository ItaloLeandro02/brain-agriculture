import { DbUpdateFarm } from '@/data/usecases'
import { mockUpdateFarmParams } from '@/tests/domain/mocks'
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
})
