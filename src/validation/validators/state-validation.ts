import type { Validation } from '@/presentation/protocols'
import { InvalidParamError } from '@/presentation/errors'

export class StateValidation implements Validation {
  constructor (
    private readonly fieldName: string,
    private readonly length: number
  ) {}

  validate (input: any): Error {
    const regex = /^[a-zA-Z]*$/
    const hasOnlyLetters = input[this.fieldName].match(regex)
    const isOverSize = input[this.fieldName].length !== this.length
    if (!hasOnlyLetters || isOverSize) {
      return new InvalidParamError(this.fieldName)
    }
  }
}
