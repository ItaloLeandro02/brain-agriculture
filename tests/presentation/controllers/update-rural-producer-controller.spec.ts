import { faker } from '@faker-js/faker'
import { ValidationSpy } from '@/tests/presentation/mocks'
import { UpdateRuralProducerController } from '@/presentation/controllers'
import { badRequest } from '@/presentation/helpers'

type SutTypes = {
  sut: UpdateRuralProducerController
  validationSpy: ValidationSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const sut = new UpdateRuralProducerController(validationSpy)
  return {
    sut,
    validationSpy
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
})
