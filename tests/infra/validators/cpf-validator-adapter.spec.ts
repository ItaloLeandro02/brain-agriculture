import { cpf as cpfValidator } from 'cpf-cnpj-validator'
import { CpfValidatorAdapter } from '@/infra/validators'

jest.mock('cpf-cnpj-validator', () => ({
  cpf: {
    isValid: () => {
      return true
    }
  }
}))

const makeSut = (): CpfValidatorAdapter => {
  return new CpfValidatorAdapter()
}

describe('CpfValidator Adapter', () => {
  test('Deve chamar Validator com o cpf corretor', () => {
    const sut = makeSut()
    const isValidSpy = jest.spyOn(cpfValidator, 'isValid')
    const cpf = '93449013092'
    sut.isValid(cpf)
    expect(isValidSpy).toHaveBeenCalledWith(cpf)
  })
  test('Deve retornar false caso o Validator retorne false', () => {
    const sut = makeSut()
    jest.spyOn(cpfValidator, 'isValid').mockReturnValueOnce(false)
    expect(sut.isValid('111.111.111-11')).toBe(false)
  })
  test('Deve retornar true caso o Validator retorne true', () => {
    const sut = makeSut()
    expect(sut.isValid('530.262.830-96')).toBe(true)
  })
})
