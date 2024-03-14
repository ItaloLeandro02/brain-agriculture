import type { Validation } from '@/presentation/protocols'
import { MissinParamError } from '@/presentation/errors'

export class RequiredFieldValidation implements Validation {
  constructor (private readonly field: string) {}

  validate (input: any): Error {
    return new MissinParamError(this.field)
  }
}
