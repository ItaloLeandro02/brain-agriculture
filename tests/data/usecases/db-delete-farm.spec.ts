import { faker } from '@faker-js/faker'
import { DbDeleteFarm } from '@/data/usecases'
import { DeleteFarmRepositorySpy } from '@/tests/data/mocks'

type SutTypes = {
  sut: DbDeleteFarm
  deleteFarmRepositorySpy: DeleteFarmRepositorySpy
}

const makeSut = (): SutTypes => {
  const deleteFarmRepositorySpy = new DeleteFarmRepositorySpy()
  const sut = new DbDeleteFarm(deleteFarmRepositorySpy)
  return {
    sut,
    deleteFarmRepositorySpy
  }
}

describe('DbDeleteFarm UseCase', () => {
  test('Deve chamar DeletePlantedCropsRepository com os dados corretos', async () => {
    const { sut, deleteFarmRepositorySpy } = makeSut()
    const ruralProducerId = faker.number.int({ min: 1, max: 100 })
    await sut.delete(ruralProducerId)
    expect(deleteFarmRepositorySpy.ruralProducerId).toBe(ruralProducerId)
  })
})
