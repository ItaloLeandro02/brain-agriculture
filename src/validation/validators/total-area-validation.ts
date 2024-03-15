import { InvalidParamError } from '@/presentation/errors'
import type { Validation } from '@/presentation/protocols'

export class TotalAreaValidation implements Validation {
  constructor (
    private readonly fieldName: string,
    private readonly fieldName2: string,
    private readonly fieldName3: string
  ) {}

  validate (input: any): Error {
    return new InvalidParamError(this.fieldName)
  }
}
