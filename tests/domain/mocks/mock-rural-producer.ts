import { faker } from '@faker-js/faker'
import type { AddRuralProducer } from '@/domain/usecases'

export const mockAddRuralProducerParams = (): AddRuralProducer.Params => ({
  cpfCnpj: '852.415.280-08',
  name: faker.person.fullName()
})
