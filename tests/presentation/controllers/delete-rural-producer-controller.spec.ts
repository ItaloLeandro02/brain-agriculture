import { faker } from '@faker-js/faker'
import { DeleteRuralProducerController } from '@/presentation/controllers'
import { notFound, serverError } from '@/presentation/helpers'
import type { DeleteRuralProducer } from '@/domain/usecases'
import { LoadRuralProducerByIdRepositorySpy } from '@/tests/data/mocks'
import { throwError } from '@/tests/domain/mocks'

type SutTypes = {
  sut: DeleteRuralProducerController
  loadRuralProducerByIdSpy: LoadRuralProducerByIdRepositorySpy
  deleteRuralProducerSpy: DeleteRuralProducerSpy
}

const makeSut = (): SutTypes => {
  const loadRuralProducerByIdSpy = new LoadRuralProducerByIdRepositorySpy()
  const deleteRuralProducerSpy = new DeleteRuralProducerSpy()
  const sut = new DeleteRuralProducerController(loadRuralProducerByIdSpy, deleteRuralProducerSpy)
  return {
    sut,
    loadRuralProducerByIdSpy,
    deleteRuralProducerSpy
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
