import { cpf as cpfValidator } from 'cpf-cnpj-validator'
import { CpfValidatorAdapter } from '@/infra/validators/cpf-validator-adapter'

const makeSut = (): CpfValidatorAdapter => {
  return new CpfValidatorAdapter()
}

describe('CpfValidator Adapter', () => {
  test('Deve chamar Validator com o cpf corretor', () => {
    const sut = makeSut()
    const isValidSpy = jest.spyOn(cpfValidator, 'isValid')
    const cpf = cpfValidator.generate()
    sut.isValid(cpf)
    expect(isValidSpy).toHaveBeenCalledWith(cpf)
  })
})
