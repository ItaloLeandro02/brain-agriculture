import { faker } from '@faker-js/faker'
import { ValidationSpy } from '@/tests/presentation/mocks'
import { UpdateRuralProducerController } from '@/presentation/controllers'
import { badRequest, serverError } from '@/presentation/helpers'
import { UpdateFarmSpy, UpdatePlantedCropsSpy, UpdateRuralProducerSpy, throwError } from '@/tests/domain/mocks'

type SutTypes = {
  sut: UpdateRuralProducerController
  validationSpy: ValidationSpy
  updateRuralProducerSpy: UpdateRuralProducerSpy
  updateFarmSpy: UpdateFarmSpy
  updatePlantedCropsSpy: UpdatePlantedCropsSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const updateRuralProducerSpy = new UpdateRuralProducerSpy()
  const updateFarmSpy = new UpdateFarmSpy()
  const updatePlantedCropsSpy = new UpdatePlantedCropsSpy()
  const sut = new UpdateRuralProducerController(validationSpy, updateRuralProducerSpy, updateFarmSpy, updatePlantedCropsSpy)
  return {
    sut,
    validationSpy,
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
})
