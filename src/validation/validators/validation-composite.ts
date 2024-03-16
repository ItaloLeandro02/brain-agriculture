import type { Validation } from '@/presentation/protocols'
import { MissinParamError } from '@/presentation/errors'

export class ValidationComposite implements Validation {
  constructor (private readonly validations: Validation[]) {}

  validate (input: any): Error {
    return new MissinParamError('field')
  }
}
