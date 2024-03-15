import type { CnpjValidator } from '@/validation/protocols'
import type { Validation } from '@/presentation/protocols'

export class CnpjValidation implements Validation {
  constructor (
    private readonly fieldName: string,
    private readonly cnpjValidator: CnpjValidator
  ) {}

  validate (input: any): Error {
    this.cnpjValidator.isValid(input[this.fieldName])
    return null
  }
}
