import type { CpfValidator } from '@/validation/protocols'
import type { Validation } from '@/presentation/protocols'
import { InvalidParamError } from '@/presentation/errors'

export class CpfValidation implements Validation {
  constructor (
    private readonly fieldName: string,
    private readonly cpfValidator: CpfValidator
  ) {}

  validate (input: any): Error {
    this.cpfValidator.isValid(input[this.fieldName])
    return new InvalidParamError(this.fieldName)
  }
}
