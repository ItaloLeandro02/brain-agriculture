import { CnpjValidatorAdapter, CpfValidatorAdapter } from '@/infra/validators'
import type { Validation } from '@/presentation/protocols'
import { CpfCnpjValidation, RequiredFieldValidation, StateValidation, TotalAreaValidation, ValidationComposite } from '@/validation/validators'

export const makeAddRuralProducerValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  const requiredFields = [
    'cpfCnpj',
    'name',
    'farmName',
    'cityName',
    'state',
    'totalArea',
    'agriculturalArea',
    'vegetationArea',
    'plantedCrops'
  ]
  for (const field of requiredFields) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new CpfCnpjValidation('cpfCnpj', new CpfValidatorAdapter(), new CnpjValidatorAdapter()))
  const stateLength = 2
  validations.push(new StateValidation('state', stateLength))
  validations.push(new TotalAreaValidation('totalArea', 'agriculturalArea', 'vegetationArea'))
  return new ValidationComposite(validations)
}
