import { cpf as cpfValidator } from 'cpf-cnpj-validator'
import type { CpfValidator } from '@/validation/protocols'

export class CpfValidatorAdapter implements CpfValidator {
  isValid (cpf: string): boolean {
    return cpfValidator.isValid(cpf)
  }
}
