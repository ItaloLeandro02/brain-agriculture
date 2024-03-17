import { DbAddRuralProducer } from '@/data/usecases'
import type { AddRuralProducer } from '@/domain/usecases'
import { RuralProducerPostgresRepository } from '@/infra/db/postgres'

export const makeDbAddRuralProducer = (): AddRuralProducer => {
  const ruralProducerPostgresRepository = new RuralProducerPostgresRepository()
  return new DbAddRuralProducer(ruralProducerPostgresRepository)
}
