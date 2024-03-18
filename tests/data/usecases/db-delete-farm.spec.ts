import { faker } from '@faker-js/faker'
import { DbDeleteFarm } from '@/data/usecases'
import { DeleteFarmRepositorySpy } from '@/tests/data/mocks'
import { throwError } from '@/tests/domain/mocks'

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
  test('Deve retornar o id do fazenda deletada em caso de sucesso', async () => {
    const { sut, deleteFarmRepositorySpy } = makeSut()
    const farmId = await sut.delete(faker.number.int({ min: 1, max: 100 }))
    expect(farmId).toEqual(deleteFarmRepositorySpy.farmId)
  })
  test('Deve retornar uma exceção caso DeletePlantedCropsRepository falhe', async () => {
    const { sut, deleteFarmRepositorySpy } = makeSut()
    jest.spyOn(deleteFarmRepositorySpy, 'delete').mockImplementationOnce(throwError)
    const promise = sut.delete(faker.number.int({ min: 1, max: 100 }))
    await expect(promise).rejects.toThrow()
  })
})
