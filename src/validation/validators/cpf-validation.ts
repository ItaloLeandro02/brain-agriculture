import type { CpfValidator } from '@/validation/protocols'
import type { Validation } from '@/presentation/protocols'

export class CpfValidation implements Validation {
  constructor (
    private readonly fieldName: string,
    private readonly cpfValidator: CpfValidator
  ) {}

  validate (input: any): Error {
    this.cpfValidator.isValid(input[this.fieldName])
    return null
  }
}
