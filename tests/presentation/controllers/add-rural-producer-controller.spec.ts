import { faker } from '@faker-js/faker'
import { AddRuralProducerController } from '@/presentation/controllers'
import { badRequest } from '@/presentation/helpers'
import { ValidationSpy } from '@/tests/presentation/mocks'
import { AddFarmSpy, AddRuralProducerSpy } from '@/tests/domain/mocks'

type SutTypes = {
  sut: AddRuralProducerController
  validationSpy: ValidationSpy
  addRuralProducerSpy: AddRuralProducerSpy
  addFarmSpy: AddFarmSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const addRuralProducerSpy = new AddRuralProducerSpy()
  const addFarmSpy = new AddFarmSpy()
  const sut = new AddRuralProducerController(validationSpy, addRuralProducerSpy, addFarmSpy)
  return {
    sut,
    validationSpy,
    addRuralProducerSpy,
    addFarmSpy
  }
}

const mockRequest = (): AddRuralProducerController.Request => ({
  cpfCnpj: '852.415.280-08',
  name: faker.person.fullName(),
  farmName: faker.company.name(),
  cityName: faker.location.city(),
  state: 'BA',
  totalArea: 200,
  agriculturalArea: 100,
  vegetationArea: 100
})

describe('AddRuralProducerController', () => {
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
  test('Deve chamar AddRuralProducer com os valores corretos', async () => {
    const { sut, addRuralProducerSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(addRuralProducerSpy.params).toEqual({
      cpfCnpj: request.cpfCnpj,
      name: request.name
    })
  })
  test('Deve chamar AddFarm com os valores corretos', async () => {
    const { sut, addFarmSpy, addRuralProducerSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(addFarmSpy.params).toEqual({
      ruralProducerId: addRuralProducerSpy.ruralProducerId,
      name: request.farmName,
      cityName: request.cityName,
      state: request.state,
      totalArea: request.totalArea,
      agriculturalArea: request.agriculturalArea,
      vegetationArea: request.vegetationArea
    })
  })
})
