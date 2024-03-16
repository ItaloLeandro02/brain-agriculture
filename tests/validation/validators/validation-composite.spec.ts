import { faker } from '@faker-js/faker'
import { ValidationComposite } from '@/validation/validators'
import type { Validation } from '@/presentation/protocols'
import { MissinParamError } from '@/presentation/errors'
import { ValidationSpy } from '@/tests/validation/mocks'

type SutTypes = {
  sut: ValidationComposite
  validationsSpy: Validation[]
}

const makeSut = (): SutTypes => {
  const validationsSpy = [
    new ValidationSpy(),
    new ValidationSpy()
  ]
  const sut = new ValidationComposite(validationsSpy)
  return {
    sut,
    validationsSpy
  }
}

describe('Validation Composite', () => {
  test('Deve retornar um erro caso alguma validação falhe', () => {
    const { sut, validationsSpy } = makeSut()
    jest.spyOn(validationsSpy[1], 'validate').mockReturnValueOnce(new MissinParamError('field'))
    const error = sut.validate({ field: faker.lorem.word() })
    expect(error).toEqual(new MissinParamError('field'))
  })
})
