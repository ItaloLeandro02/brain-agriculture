import { cnpj as cnpjValidator } from 'cpf-cnpj-validator'
import type { CnpjValidator } from '@/validation/protocols'

export class CnpjValidatorAdapter implements CnpjValidator {
  isValid (cnpj: string): boolean {
    return cnpjValidator.isValid(cnpj)
  }
}
