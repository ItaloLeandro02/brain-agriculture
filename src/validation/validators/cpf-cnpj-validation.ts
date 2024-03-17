import type { CnpjValidator, CpfValidator } from '@/validation/protocols'
import type { Validation } from '@/presentation/protocols'
import { InvalidParamError } from '@/presentation/errors'

export class CpfCnpjValidation implements Validation {
  constructor (
    private readonly fieldName: string,
    private readonly cpfValidator: CpfValidator,
    private readonly cnpjValidator: CnpjValidator
  ) {}

  validate (input: any): Error {
    const isCpfValid = this.cpfValidator.isValid(input[this.fieldName])
    const isCnpjValid = this.cnpjValidator.isValid(input[this.fieldName])
    if (!isCpfValid && !isCnpjValid) {
      return new InvalidParamError(this.fieldName)
    }
  }
}
