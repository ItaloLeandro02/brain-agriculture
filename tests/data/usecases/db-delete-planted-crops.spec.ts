import { faker } from '@faker-js/faker'
import { DbDeletePlantedCrops } from '@/data/usecases'
import { DeletePlantedCropsRepositorySpy } from '@/tests/data/mocks'

type SutTypes = {
  sut: DbDeletePlantedCrops
  deletePlantedCropsRepositorySpy: DeletePlantedCropsRepositorySpy
}

const makeSut = (): SutTypes => {
  const deletePlantedCropsRepositorySpy = new DeletePlantedCropsRepositorySpy()
  const sut = new DbDeletePlantedCrops(deletePlantedCropsRepositorySpy)
  return {
    sut,
    deletePlantedCropsRepositorySpy
  }
}

describe('DbDeletePlantedCrops UseCase', () => {
  test('Deve chamar DeletePlantedCropsRepository com os dados corretos', async () => {
    const { sut, deletePlantedCropsRepositorySpy } = makeSut()
    const farmId = faker.number.int({ min: 1, max: 100 })
    await sut.delete(farmId)
    expect(deletePlantedCropsRepositorySpy.farmId).toBe(farmId)
  })
})
