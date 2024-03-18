import { faker } from '@faker-js/faker'
import { DeleteRuralProducerController } from '@/presentation/controllers'
import { LoadRuralProducerByIdRepositorySpy } from '@/tests/data/mocks'

type SutTypes = {
  sut: DeleteRuralProducerController
  loadRuralProducerByIdSpy: LoadRuralProducerByIdRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadRuralProducerByIdSpy = new LoadRuralProducerByIdRepositorySpy()
  const sut = new DeleteRuralProducerController(loadRuralProducerByIdSpy)
  return {
    sut,
    loadRuralProducerByIdSpy
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
})
