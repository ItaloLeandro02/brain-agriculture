import { cnpj } from 'cpf-cnpj-validator'
import { CnpjValidation } from '@/validation/validators'
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
})
