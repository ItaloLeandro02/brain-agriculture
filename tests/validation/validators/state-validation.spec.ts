import { StateValidation } from '@/validation/validators'
import { InvalidParamError } from '@/presentation/errors'

const makeSut = (length = 2): StateValidation => {
  return new StateValidation('state', length)
}

describe('State Validation', () => {
  test('Deve retornar InvalidParamError caso o valor contenha mais do que letras', () => {
    const sut = makeSut()
    const error = sut.validate({ state: 'B1' })
    expect(error).toEqual(new InvalidParamError('state'))
  })
  test('Deve retornar InvalidParamError caso o valor contenha mais do que 2 caracteres', () => {
    const sut = makeSut()
    const error = sut.validate({ state: 'BAA' })
    expect(error).toEqual(new InvalidParamError('state'))
  })
})
