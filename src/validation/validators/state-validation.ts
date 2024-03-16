import type { Validation } from '@/presentation/protocols'
import { InvalidParamError } from '@/presentation/errors'

export class StateValidation implements Validation {
  constructor (private readonly fieldName: string) {}

  validate (input: any): Error {
    return new InvalidParamError(this.fieldName)
  }
}
