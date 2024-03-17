import { cpf as cpfValidator, cnpj as cnpjValidator } from 'cpf-cnpj-validator'
import { CpfCnpjValidation } from '@/validation/validators'
import { InvalidParamError } from '@/presentation/errors'
import { CnpjValidatorSpy, CpfValidatorSpy } from '@/tests/validation/mocks'
import { throwError } from '@/tests/domain/mocks'

type SutTypes = {
  sut: CpfCnpjValidation
  cpfValidatorSpy: CpfValidatorSpy
  cnpjValidatorSpy: CnpjValidatorSpy
}

const makeSut = (): SutTypes => {
  const cpfValidatorSpy = new CpfValidatorSpy()
  const cnpjValidatorSpy = new CnpjValidatorSpy()
  const sut = new CpfCnpjValidation('cpfCnpj', cpfValidatorSpy, cnpjValidatorSpy)
  return {
    sut,
    cpfValidatorSpy,
    cnpjValidatorSpy
  }
}

describe('CPF CNPJ Validation', () => {
  test('Deve retornar InvalidParamError caso CnpjValidator e CpfValidator retorne false', () => {
    const { sut, cnpjValidatorSpy, cpfValidatorSpy } = makeSut()
    cnpjValidatorSpy.isCnpjValid = false
    cpfValidatorSpy.isCpfValid = false
    const error = sut.validate({ cpfCnpj: cnpjValidator.generate() })
    expect(error).toEqual(new InvalidParamError('cpfCnpj'))
  })

  describe('CPF', () => {
    test('Deve chamar CpfValidator com o cpf correto', () => {
      const { sut, cpfValidatorSpy } = makeSut()
      const cpf = cpfValidator.generate()
      sut.validate({ cpfCnpj: cpf })
      expect(cpfValidatorSpy.cpf).toEqual(cpf)
    })
    test('Não deve retornar um error caso CpfValidator retorne true', () => {
      const { sut } = makeSut()
      const error = sut.validate({ cpfCnpj: cpfValidator.generate() })
      expect(error).toBeFalsy()
    })
    test('Deve retornar uma exceção caso CpfValidator falhe', () => {
      const { sut, cpfValidatorSpy } = makeSut()
      jest.spyOn(cpfValidatorSpy, 'isValid').mockImplementationOnce(throwError)
      expect(() => {
        sut.validate({ cpfCnpj: cpfValidator.generate() })
      }).toThrow()
    })
  })
  describe('CNPJ', () => {
    test('Deve chamar CnpjValidator com os dados corretos', () => {
      const { sut, cnpjValidatorSpy } = makeSut()
      const cnpj = cnpjValidator.generate()
      sut.validate({ cpfCnpj: cnpj })
      expect(cnpjValidatorSpy.cnpj).toEqual(cnpj)
    })
    test('Não deve retornar um error caso CnpjValidator retorne true', () => {
      const { sut } = makeSut()
      const error = sut.validate({ cpfCnpj: cnpjValidator.generate() })
      expect(error).toBeFalsy()
    })
    test('Deve retornar uma exceção caso CnpjValidator falhe', () => {
      const { sut, cnpjValidatorSpy } = makeSut()
      jest.spyOn(cnpjValidatorSpy, 'isValid').mockImplementationOnce(throwError)
      expect(() => {
        sut.validate({ cpfCnpj: cnpjValidator.generate() })
      }).toThrow()
    })
  })
})
