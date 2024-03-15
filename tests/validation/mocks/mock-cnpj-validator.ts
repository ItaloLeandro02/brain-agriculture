import type { CnpjValidator } from '@/validation/protocols'

export class CnpjValidatorSpy implements CnpjValidator {
  cnpj: string
  isCnpjValid = true

  isValid (cnpj: string): boolean {
    this.cnpj = cnpj
    return this.isCnpjValid
  }
}
