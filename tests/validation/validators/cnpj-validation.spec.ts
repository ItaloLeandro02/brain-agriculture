import { cnpj } from 'cpf-cnpj-validator'
import { CnpjValidation } from '@/validation/validators'
import { InvalidParamError } from '@/presentation/errors'
import { CnpjValidatorSpy } from '@/tests/validation/mocks'

type SutTypes = {
  sut: CnpjValidation
  cnpjValidatorSpy: CnpjValidatorSpy
}

const makeSut = (): SutTypes => {
  const cnpjValidatorSpy = new CnpjValidatorSpy()
  const sut = new CnpjValidation('cnpj', cnpjValidatorSpy)
  return {
    sut,
    cnpjValidatorSpy
  }
}

describe('CNPJ Validation', () => {
  test('Deve chamar CnpjValidator com os dados corretos', () => {
    const { sut, cnpjValidatorSpy } = makeSut()
    const cnpjValue = cnpj.generate()
    sut.validate({ cnpj: cnpjValue })
    expect(cnpjValidatorSpy.cnpj).toEqual(cnpjValue)
  })
  test('Deve retornar InvalidParamError caso CnpjValidator retorne false', () => {
    const { sut, cnpjValidatorSpy } = makeSut()
    cnpjValidatorSpy.isCnpjValid = false
    const error = sut.validate({ cnpj: cnpj.generate() })
    expect(error).toEqual(new InvalidParamError('cnpj'))
  })
  test('Não deve retornar um error caso CnpjValidator retorne true', () => {
    const { sut } = makeSut()
    const error = sut.validate({ cnpj: cnpj.generate() })
    expect(error).toBeFalsy()
  })
})
