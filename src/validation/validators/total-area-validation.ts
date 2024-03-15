import { InvalidParamError } from '@/presentation/errors'
import type { Validation } from '@/presentation/protocols'

export class TotalAreaValidation implements Validation {
  constructor (
    private readonly fieldName: string,
    private readonly fieldName2: string,
    private readonly fieldName3: string
  ) {}

  validate (input: any): Error {
    const fieldValue = parseFloat(input[this.fieldName])
    const fieldValue2 = parseFloat(input[this.fieldName2])
    const fieldValue3 = parseFloat(input[this.fieldName3])
    const total = fieldValue2 + fieldValue3
    if (fieldValue !== total) {
      return new InvalidParamError(this.fieldName)
    }
  }
}
