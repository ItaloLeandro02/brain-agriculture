import { faker } from '@faker-js/faker'
import { cpf as cpfValidator, cnpj as cnpjValidator } from 'cpf-cnpj-validator'
import type { AddRuralProducer, UpdateRuralProducer } from '@/domain/usecases'

export const mockAddRuralProducerParams = (): AddRuralProducer.Params => ({
  cpfCnpj: cpfValidator.generate(),
  name: faker.person.fullName()
})

export const mockUpdateRuralProducerParams = (ruralProducerId: number): UpdateRuralProducer.Params => ({
  id: ruralProducerId,
  cpfCnpj: cnpjValidator.generate(),
  name: faker.person.fullName()
})
