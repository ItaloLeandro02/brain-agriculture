import { generate } from 'gerador-validador-cpf'
import { CpfValidation } from '@/validation/validators'
import { CpfValidatorSpy } from '@/tests/validation/mocks'

type SutTypes = {
  sut: CpfValidation
  cpfValidatorSpy: CpfValidatorSpy
}

const makeSut = (): SutTypes => {
  const cpfValidatorSpy = new CpfValidatorSpy()
  const sut = new CpfValidation('cpf', cpfValidatorSpy)
  return {
    sut,
    cpfValidatorSpy
  }
}

describe('CPF Validation', () => {
  test('Deve chamar CpfValidator com o cpf correto', () => {
    const { sut, cpfValidatorSpy } = makeSut()
    const cpf = generate()
    sut.validate({ cpf })
    expect(cpfValidatorSpy.cpf).toEqual(cpf)
  })
})
