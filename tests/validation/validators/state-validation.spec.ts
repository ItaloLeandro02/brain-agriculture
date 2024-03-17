import { faker } from '@faker-js/faker'
import { StateValidation } from '@/validation/validators'
import { InvalidParamError } from '@/presentation/errors'

const makeSut = (length = 2): StateValidation => {
  return new StateValidation('state', length)
}

describe('State Validation', () => {
  test('Deve retornar InvalidParamError caso o valor contenha mais do que letras', () => {
    const sut = makeSut()
    const error = sut.validate({ state: faker.string.uuid() })
    expect(error).toEqual(new InvalidParamError('state'))
  })
  test('Deve retornar InvalidParamError caso o valor contenha mais do que 2 caracteres', () => {
    const sut = makeSut()
    const error = sut.validate({ state: faker.lorem.word(3) })
    expect(error).toEqual(new InvalidParamError('state'))
  })
  test('Não deve retornar um error em caso de sucesso', () => {
    const sut = makeSut()
    const error = sut.validate({ state: faker.lorem.word(2) })
    expect(error).toBeFalsy()
  })
})
