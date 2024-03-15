import type { CnpjValidator } from '@/validation/protocols'
import type { Validation } from '@/presentation/protocols'
import { InvalidParamError } from '@/presentation/errors'

export class CnpjValidation implements Validation {
  constructor (
    private readonly fieldName: string,
    private readonly cnpjValidator: CnpjValidator
  ) {}

  validate (input: any): Error {
    const isValid = this.cnpjValidator.isValid(input[this.fieldName])
    if (!isValid) {
      return new InvalidParamError(this.fieldName)
    }
  }
}
