import { faker } from '@faker-js/faker'
import { DeleteRuralProducerController } from '@/presentation/controllers'
import { notFound, serverError } from '@/presentation/helpers'
import type { DeleteFarm, DeleteRuralProducer } from '@/domain/usecases'
import { LoadRuralProducerByIdRepositorySpy } from '@/tests/data/mocks'
import { throwError } from '@/tests/domain/mocks'

type SutTypes = {
  sut: DeleteRuralProducerController
  loadRuralProducerByIdSpy: LoadRuralProducerByIdRepositorySpy
  deleteRuralProducerSpy: DeleteRuralProducerSpy
  deleteFarmSpy: DeleteFarmSpy
}

const makeSut = (): SutTypes => {
  const loadRuralProducerByIdSpy = new LoadRuralProducerByIdRepositorySpy()
  const deleteRuralProducerSpy = new DeleteRuralProducerSpy()
  const deleteFarmSpy = new DeleteFarmSpy()
  const sut = new DeleteRuralProducerController(loadRuralProducerByIdSpy, deleteRuralProducerSpy, deleteFarmSpy)
  return {
    sut,
    loadRuralProducerByIdSpy,
    deleteRuralProducerSpy,
    deleteFarmSpy
  }
}

const mockRequest = (): DeleteRuralProducerController.Request => ({
  id: faker.number.int({ min: 1, max: 100 })
})

export class DeleteRuralProducerSpy implements DeleteRuralProducer {
  id: number

  async delete (id: number): Promise<void> {
    this.id = id
    await Promise.resolve()
  }
}

export class DeleteFarmSpy implements DeleteFarm {
  ruralProducerId: number
  farmId = faker.number.int({ min: 1, max: 100 })

  async delete (ruralProducerId: number): Promise<number> {
    this.ruralProducerId = ruralProducerId
    return await Promise.resolve(this.farmId)
  }
}

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
  test('Deve retornar 404 caso LoadRuralProducerById retorne false', async () => {
    const { sut, loadRuralProducerByIdSpy } = makeSut()
    loadRuralProducerByIdSpy.existsOnDatabase = false
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(notFound())
  })
})
