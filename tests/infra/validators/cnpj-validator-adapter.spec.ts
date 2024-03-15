import { cnpj as cnpjValidator } from 'cpf-cnpj-validator'
import { CnpjValidatorAdapter } from '@/infra/validators'

jest.mock('cpf-cnpj-validator', () => ({
  cnpj: {
    isValid: () => {
      return true
    }
  }
}))

const makeSut = (): CnpjValidatorAdapter => {
  return new CnpjValidatorAdapter()
}

describe('CnpjValidator Adapter', () => {
  test('Deve chamar Validator com o cnpj corretor', () => {
    const sut = makeSut()
    const isValidSpy = jest.spyOn(cnpjValidator, 'isValid')
    const cnpj = '64876764000128'
    sut.isValid(cnpj)
    expect(isValidSpy).toHaveBeenCalledWith(cnpj)
  })
  test('Deve retornar false caso o Validator retorne false', () => {
    const sut = makeSut()
    jest.spyOn(cnpjValidator, 'isValid').mockReturnValueOnce(false)
    expect(sut.isValid('11.111.111/1111-11')).toBe(false)
  })
  test('Deve retornar true caso o Validator retorne true', () => {
    const sut = makeSut()
    expect(sut.isValid('31.307.371/0001-44')).toBe(true)
  })
})
