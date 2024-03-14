import type { Validation } from '@/presentation/protocols'
import { MissinParamError } from '@/presentation/errors'

export class RequiredFieldValidation implements Validation {
  constructor (private readonly fieldName: string) {}

  validate (input: any): Error {
    if (!input[this.fieldName]) {
      return new MissinParamError(this.fieldName)
    }
  }
}
