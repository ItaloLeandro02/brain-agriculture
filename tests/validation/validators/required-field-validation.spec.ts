import { faker } from '@faker-js/faker'
import { MissinParamError } from '@/presentation/errors'
import { RequiredFieldValidation } from '@/validation/validators'

const makeSut = (): RequiredFieldValidation => {
  return new RequiredFieldValidation('field')
}

describe('RequiredField Validation', () => {
  test('Deve retornar um MissinParamError se a validação falhar', () => {
    const sut = makeSut()
    const error = sut.validate({ name: faker.person.fullName() })
    expect(error).toEqual(new MissinParamError('field'))
  })
})
