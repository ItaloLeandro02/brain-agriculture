import { faker } from '@faker-js/faker'
import type { AddPlantedCropsRepository } from '@/data/protocols'
import { DbAddPlantedCrops } from '@/data/usecases'
import { AddPlantedCropsRepositorySpy } from '@/tests/data/mocks'
import { throwError } from '@/tests/domain/mocks'

type SutTypes = {
  sut: DbAddPlantedCrops
  addPlantedCropsRepositorySpy: AddPlantedCropsRepositorySpy
}

const makeSut = (): SutTypes => {
  const addPlantedCropsRepositorySpy = new AddPlantedCropsRepositorySpy()
  const sut = new DbAddPlantedCrops(addPlantedCropsRepositorySpy)
  return {
    sut,
    addPlantedCropsRepositorySpy
  }
}

const mockParams = (): AddPlantedCropsRepository.Params => ({
  farmId: faker.number.int(),
  plantedCrops: ['Cana de açucar', 'Soja']
})

describe('DbAddPlantedCrops UseCase', () => {
  test('Deve chamar AddPlantedCropsRepository com os dados corretos', async () => {
    const { sut, addPlantedCropsRepositorySpy } = makeSut()
    const params = mockParams()
    await sut.add(params)
    expect(addPlantedCropsRepositorySpy.params).toEqual(params)
  })
  test('Deve lançar uma exceção caso AddPlantedCropsRepository lance uma exceção', async () => {
    const { sut, addPlantedCropsRepositorySpy } = makeSut()
    jest.spyOn(addPlantedCropsRepositorySpy, 'add').mockImplementationOnce(throwError)
    const promise = sut.add(mockParams())
    await expect(promise).rejects.toThrow()
  })
})
