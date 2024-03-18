import { DbUpdateRuralProducer } from '@/data/usecases'
import type { UpdateRuralProducer } from '@/domain/usecases'
import { RuralProducerPostgresRepository } from '@/infra/db/postgres'

export const makeDbUpdateRuralProducer = (): UpdateRuralProducer => {
  const ruralProducerPostgresRepository = new RuralProducerPostgresRepository()
  return new DbUpdateRuralProducer(ruralProducerPostgresRepository)
}
