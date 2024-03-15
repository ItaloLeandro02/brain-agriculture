import { cnpj as cnpjValidator } from 'cpf-cnpj-validator'
import { CnpjValidatorAdapter } from '@/infra/validators'

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
})
