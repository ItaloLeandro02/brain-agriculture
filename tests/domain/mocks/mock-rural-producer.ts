import { faker } from '@faker-js/faker'
import { cpf as cpfValidator, cnpj as cnpjValidator } from 'cpf-cnpj-validator'
import type { AddRuralProducer, UpdateRuralProducer } from '@/domain/usecases'

export const mockAddRuralProducerParams = (): AddRuralProducer.Params => ({
  cpfCnpj: cpfValidator.generate(),
  name: faker.person.fullName()
})

export const mockUpdateRuralProducerParams = (): UpdateRuralProducer.Params => ({
  id: faker.number.int({ min: 1, max: 100 }),
  cpfCnpj: cnpjValidator.generate(),
  name: faker.person.fullName()
})
