import { faker } from '@faker-js/faker'
import { UpdateRuralProducerController } from '@/presentation/controllers'
import { badRequest, noContent, serverError } from '@/presentation/helpers'
import type { LoadRuralProducerById } from '@/domain/usecases'
import { ValidationSpy } from '@/tests/presentation/mocks'
import { UpdateFarmRepositorySpy, UpdatePlantedCropsRepositorySpy, UpdateRuralProducerRepositorySpy } from '@/tests/data/mocks'
import { throwError } from '@/tests/domain/mocks'

type SutTypes = {
  sut: UpdateRuralProducerController
  validationSpy: ValidationSpy
  loadRuralProducerByIdSpy: LoadRuralProducerByIdSpy
  updateRuralProducerSpy: UpdateRuralProducerRepositorySpy
  updateFarmSpy: UpdateFarmRepositorySpy
  updatePlantedCropsSpy: UpdatePlantedCropsRepositorySpy
}

export class LoadRuralProducerByIdSpy implements LoadRuralProducerById {
  id: number
  result = true

  async load (id: number): Promise<boolean> {
    this.id = id
    return await Promise.resolve(this.result)
  }
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const loadRuralProducerByIdSpy = new LoadRuralProducerByIdSpy()
  const updateRuralProducerSpy = new UpdateRuralProducerRepositorySpy()
  const updateFarmSpy = new UpdateFarmRepositorySpy()
  const updatePlantedCropsSpy = new UpdatePlantedCropsRepositorySpy()
  const sut = new UpdateRuralProducerController(validationSpy, loadRuralProducerByIdSpy, updateRuralProducerSpy, updateFarmSpy, updatePlantedCropsSpy)
  return {
    sut,
    validationSpy,
    loadRuralProducerByIdSpy,
    updateRuralProducerSpy,
    updateFarmSpy,
    updatePlantedCropsSpy
  }
}

const mockRequest = (): UpdateRuralProducerController.Request => ({
  id: faker.number.int({ min: 1, max: 100 }),
  cpfCnpj: '852.415.280-08',
  name: faker.person.fullName(),
  farmName: faker.company.name(),
  cityName: faker.location.city(),
  state: 'BA',
  totalArea: 200,
  agriculturalArea: 100,
  vegetationArea: 100,
  plantedCrops: ['Soja', 'Milho', 'Algodão', 'Café', 'Cana de Açucar']
})

describe('UpdateRuralProducer Controller', () => {
  test('Deve chamar Validation com os dados corretos', async () => {
    const { sut, validationSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(validationSpy.input).toEqual(request)
  })
  test('Deve retornar 400 caso alguma validação falhe', async () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.error = new Error()
    const request = mockRequest()
    const response = await sut.handle(request)
    expect(response).toEqual(badRequest(new Error()))
  })
  test('Deve chamar LoadRuralProducerById com os valores corretos', async () => {
    const { sut, loadRuralProducerByIdSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(loadRuralProducerByIdSpy.id).toBe(request.id)
  })
  test('Deve chamar UpdateRuralProducer com os valores corretos', async () => {
    const { sut, updateRuralProducerSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(updateRuralProducerSpy.params).toEqual({
      id: request.id,
      cpfCnpj: request.cpfCnpj,
      name: request.name
    })
  })
  test('Deve chamar UpdateFarm com os valores corretos', async () => {
    const { sut, updateFarmSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(updateFarmSpy.params).toEqual({
      ruralProducerId: request.id,
      name: request.farmName,
      cityName: request.cityName,
      state: request.state,
      totalArea: request.totalArea,
      agriculturalArea: request.agriculturalArea,
      vegetationArea: request.vegetationArea
    })
  })
  test('Deve chamar UpdatePlantedCrop com os valores corretos', async () => {
    const { sut, updateFarmSpy, updatePlantedCropsSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(updatePlantedCropsSpy.params).toEqual({
      farmId: updateFarmSpy.farmId,
      plantedCrops: request.plantedCrops
    })
  })
  test('Deve retornar 500 caso LoadRuralProducerById lance uma exceção', async () => {
    const { sut, loadRuralProducerByIdSpy } = makeSut()
    jest.spyOn(loadRuralProducerByIdSpy, 'load').mockImplementationOnce(throwError)
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(serverError(new Error()))
  })
  test('Deve retornar 500 caso UpdateRuralProducer lance uma exceção', async () => {
    const { sut, updateRuralProducerSpy } = makeSut()
    jest.spyOn(updateRuralProducerSpy, 'update').mockImplementationOnce(throwError)
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(serverError(new Error()))
  })
  test('Deve retornar 500 caso UpdateFarm lance uma exceção', async () => {
    const { sut, updateFarmSpy } = makeSut()
    jest.spyOn(updateFarmSpy, 'update').mockImplementationOnce(throwError)
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(serverError(new Error()))
  })
  test('Deve retornar 500 caso UpdatePlantedCrop lance uma exceção', async () => {
    const { sut, updatePlantedCropsSpy } = makeSut()
    jest.spyOn(updatePlantedCropsSpy, 'update').mockImplementationOnce(throwError)
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(serverError(new Error()))
  })
  test('Deve retornar 204 em caso de sucesso', async () => {
    const { sut } = makeSut()
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(noContent())
  })
})
