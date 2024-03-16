import { StateValidation } from '@/validation/validators'
import { InvalidParamError } from '@/presentation/errors'

const makeSut = (): StateValidation => {
  return new StateValidation('state')
}

describe('State Validation', () => {
  test('Deve retornar InvalidParamError caso o valor contenha mais do que letras', () => {
    const sut = makeSut()
    const error = sut.validate({ state: 'B1' })
    expect(error).toEqual(new InvalidParamError('state'))
  })
})
