import { TotalAreaValidation } from '@/validation/validators'
import { InvalidParamError } from '@/presentation/errors'

const makeSut = (): TotalAreaValidation => {
  return new TotalAreaValidation('totalArea', 'agriculturalArea', 'vegetationArea')
}

type Params = {
  totalArea: number
  agriculturalArea: number
  vegetationArea: number
}
const mockParams = (): Params => ({
  totalArea: 300,
  agriculturalArea: 200,
  vegetationArea: 100
})

describe('TotalArea Validation', () => {
  test('Deve retornar InvalidParamError caso a soma da área agriculável com área de vegetação seja maior do que à área total', () => {
    const sut = makeSut()
    const error = sut.validate({ ...mockParams(), vegetationArea: 150 })
    expect(error).toEqual(new InvalidParamError('totalArea'))
  })
  test('Deve retornar InvalidParamError caso a soma da área agriculável com área de vegetação seja menor do que à área total', () => {
    const sut = makeSut()
    const error = sut.validate({ ...mockParams(), vegetationArea: 50 })
    expect(error).toEqual(new InvalidParamError('totalArea'))
  })
  test('Não deve retornar um error caso a soma da área agriculável com área de vegetação seja igual à área total', () => {
    const sut = makeSut()
    const error = sut.validate(mockParams())
    expect(error).toBeFalsy()
  })
})
