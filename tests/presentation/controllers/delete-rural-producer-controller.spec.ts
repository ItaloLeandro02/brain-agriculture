import { faker } from '@faker-js/faker'
import { DeleteRuralProducerController } from '@/presentation/controllers'
import { noContent, notFound, serverError } from '@/presentation/helpers'
import { DeleteFarmRepositorySpy, DeletePlantedCropsRepositorySpy, DeleteRuralProducerRepositorySpy, LoadRuralProducerByIdRepositorySpy } from '@/tests/data/mocks'
import { throwError } from '@/tests/domain/mocks'

type SutTypes = {
  sut: DeleteRuralProducerController
  loadRuralProducerByIdSpy: LoadRuralProducerByIdRepositorySpy
  deleteRuralProducerSpy: DeleteRuralProducerRepositorySpy
  deleteFarmSpy: DeleteFarmRepositorySpy
  deletePlantedCropsSpy: DeletePlantedCropsRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadRuralProducerByIdSpy = new LoadRuralProducerByIdRepositorySpy()
  const deleteRuralProducerSpy = new DeleteRuralProducerRepositorySpy()
  const deleteFarmSpy = new DeleteFarmRepositorySpy()
  const deletePlantedCropsSpy = new DeletePlantedCropsRepositorySpy()
  const sut = new DeleteRuralProducerController(loadRuralProducerByIdSpy, deleteRuralProducerSpy, deleteFarmSpy, deletePlantedCropsSpy)
  return {
    sut,
    loadRuralProducerByIdSpy,
    deleteRuralProducerSpy,
    deleteFarmSpy,
    deletePlantedCropsSpy
  }
}

const mockRequest = (): DeleteRuralProducerController.Request => ({
  id: faker.number.int({ min: 1, max: 100 })
})

describe('DeleteRuralProducer Controller', () => {
  test('Deve chamar LoadRuralProducerById com os valores corretos', async () => {
    const { sut, loadRuralProducerByIdSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(loadRuralProducerByIdSpy.id).toBe(request.id)
  })
  test('Deve chamar DeleteRuralProducer com os valores corretos', async () => {
    const { sut, deleteRuralProducerSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(deleteRuralProducerSpy.id).toBe(request.id)
  })
  test('Deve chamar DeleteFarm com os valores corretos', async () => {
    const { sut, deleteFarmSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(deleteFarmSpy.ruralProducerId).toBe(request.id)
  })
  test('Deve chamar DeletePlantedCrop com os valores corretos', async () => {
    const { sut, deleteFarmSpy, deletePlantedCropsSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(deletePlantedCropsSpy.farmId).toBe(deleteFarmSpy.farmId)
  })
  test('Deve retornar 500 caso LoadRuralProducerById lance uma exceção', async () => {
    const { sut, loadRuralProducerByIdSpy } = makeSut()
    jest.spyOn(loadRuralProducerByIdSpy, 'load').mockImplementationOnce(throwError)
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(serverError(new Error()))
  })
  test('Deve retornar 500 caso DeleteRuralProducer lance uma exceção', async () => {
    const { sut, deleteRuralProducerSpy } = makeSut()
    jest.spyOn(deleteRuralProducerSpy, 'delete').mockImplementationOnce(throwError)
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(serverError(new Error()))
  })
  test('Deve retornar 500 caso DeleteFarm lance uma exceção', async () => {
    const { sut, deleteFarmSpy } = makeSut()
    jest.spyOn(deleteFarmSpy, 'delete').mockImplementationOnce(throwError)
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(serverError(new Error()))
  })
  test('Deve retornar 500 caso DeletePlantedCrop lance uma exceção', async () => {
    const { sut, deletePlantedCropsSpy } = makeSut()
    jest.spyOn(deletePlantedCropsSpy, 'delete').mockImplementationOnce(throwError)
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(serverError(new Error()))
  })
  test('Deve retornar 404 caso LoadRuralProducerById retorne false', async () => {
    const { sut, loadRuralProducerByIdSpy } = makeSut()
    loadRuralProducerByIdSpy.existsOnDatabase = false
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(notFound())
  })
  test('Deve retornar 204 em caso de sucesso', async () => {
    const { sut } = makeSut()
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(noContent())
  })
})
