import { AddRuralProducerController } from '@/presentation/controllers'
import { badRequest } from '@/presentation/helpers'
import { ValidationSpy } from '@/tests/presentation/mocks'

type SutTypes = {
  sut: AddRuralProducerController
  validationSpy: ValidationSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const sut = new AddRuralProducerController(validationSpy)
  return {
    sut,
    validationSpy
  }
}

const mockRequest = (): AddRuralProducerController.Request => ({
  cpfCnpj: ''
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
})
