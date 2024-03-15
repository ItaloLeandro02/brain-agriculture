import type { CpfValidator } from '@/validation/protocols'

export class CpfValidatorSpy implements CpfValidator {
  cpf: string
  isCpfValid = true

  isValid (cpf: string): boolean {
    this.cpf = cpf
    return this.isCpfValid
  }
}
