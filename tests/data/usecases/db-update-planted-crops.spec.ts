import { DbUpdatePlantedCrops } from '@/data/usecases'
import { mockUpdatePlantedCropsParams } from '@/tests/domain/mocks'
import { UpdatePlantedCropsRepositorySpy } from '@/tests/data/mocks'

type SutTypes = {
  sut: DbUpdatePlantedCrops
  updatePlantedCropsRepositorySpy: UpdatePlantedCropsRepositorySpy
}

const makeSut = (): SutTypes => {
  const updatePlantedCropsRepositorySpy = new UpdatePlantedCropsRepositorySpy()
  const sut = new DbUpdatePlantedCrops(updatePlantedCropsRepositorySpy)
  return {
    sut,
    updatePlantedCropsRepositorySpy
  }
}

describe('DbUpdatePlantedCrops UseCase', () => {
  test('Deve chamar UpdatePlantedCropsRepository com os dados corretos', async () => {
    const { sut, updatePlantedCropsRepositorySpy } = makeSut()
    const params = mockUpdatePlantedCropsParams()
    await sut.update(params)
    expect(updatePlantedCropsRepositorySpy.params).toEqual(params)
  })
})
