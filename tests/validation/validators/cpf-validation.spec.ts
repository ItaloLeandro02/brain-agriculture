import { cpf } from 'cpf-cnpj-validator'
import { CpfValidation } from '@/validation/validators'
import { InvalidParamError } from '@/presentation/errors'
import { CpfValidatorSpy } from '@/tests/validation/mocks'
import { throwError } from '@/tests/domain/mocks'

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
    const cpfValue = cpf.generate()
    sut.validate({ cpf: cpfValue })
    expect(cpfValidatorSpy.cpf).toEqual(cpfValue)
  })
  test('Deve retornar InvalidParamError caso CpfValidator retorne false', () => {
    const { sut, cpfValidatorSpy } = makeSut()
    cpfValidatorSpy.isCpfValid = false
    const error = sut.validate({ cpf: cpf.generate() })
    expect(error).toEqual(new InvalidParamError('cpf'))
  })
  test('Não deve retornar um error caso CpfValidator retorne true', () => {
    const { sut } = makeSut()
    const error = sut.validate({ cpf: cpf.generate() })
    expect(error).toBeFalsy()
  })
  test('Deve retornar uma exceção caso CpfValidator falhe', () => {
    const { sut, cpfValidatorSpy } = makeSut()
    jest.spyOn(cpfValidatorSpy, 'isValid').mockImplementationOnce(throwError)
    expect(() => {
      sut.validate({ cpf: cpf.generate() })
    }).toThrow()
  })
})
