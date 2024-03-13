import { faker } from '@faker-js/faker'
import { AddRuralProducerController } from '@/presentation/controllers'
import { badRequest } from '@/presentation/helpers'
import { ValidationSpy } from '@/tests/presentation/mocks'
import { AddRuralProducerSpy } from '@/tests/domain/mocks'

type SutTypes = {
  sut: AddRuralProducerController
  validationSpy: ValidationSpy
  addRuralProducerSpy: AddRuralProducerSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const addRuralProducerSpy = new AddRuralProducerSpy()
  const sut = new AddRuralProducerController(validationSpy, addRuralProducerSpy)
  return {
    sut,
    validationSpy,
    addRuralProducerSpy
  }
}

const mockRequest = (cpfCnpj = '852.415.280-08'): AddRuralProducerController.Request => ({
  cpfCnpj,
  name: faker.person.fullName()
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
    const ruralProducerName = faker.person.fullName()
    const request = {
      ...mockRequest(),
      name: ruralProducerName
    }
    await sut.handle(request)
    expect(addRuralProducerSpy.params).toEqual({
      cpfCnpj: '852.415.280-08',
      name: ruralProducerName
    })
  })
})
