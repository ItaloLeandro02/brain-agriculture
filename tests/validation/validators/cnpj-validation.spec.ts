import { cnpj as cnpjValidator } from 'cpf-cnpj-validator'
import { CnpjValidation } from '@/validation/validators'
import { InvalidParamError } from '@/presentation/errors'
import { CnpjValidatorSpy } from '@/tests/validation/mocks'
import { throwError } from '@/tests/domain/mocks'

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
    const cnpj = cnpjValidator.generate()
    sut.validate({ cnpj })
    expect(cnpjValidatorSpy.cnpj).toEqual(cnpj)
  })
  test('Deve retornar InvalidParamError caso CnpjValidator retorne false', () => {
    const { sut, cnpjValidatorSpy } = makeSut()
    cnpjValidatorSpy.isCnpjValid = false
    const error = sut.validate({ cnpj: cnpjValidator.generate() })
    expect(error).toEqual(new InvalidParamError('cnpj'))
  })
  test('Não deve retornar um error caso CnpjValidator retorne true', () => {
    const { sut } = makeSut()
    const error = sut.validate({ cnpj: cnpjValidator.generate() })
    expect(error).toBeFalsy()
  })
  test('Deve retornar uma exceção caso CnpjValidator falhe', () => {
    const { sut, cnpjValidatorSpy } = makeSut()
    jest.spyOn(cnpjValidatorSpy, 'isValid').mockImplementationOnce(throwError)
    expect(() => {
      sut.validate({ cnpj: cnpjValidator.generate() })
    }).toThrow()
  })
})
