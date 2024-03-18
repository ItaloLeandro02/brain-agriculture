import { DbDeleteRuralProducer } from '@/data/usecases'
import type { DeleteRuralProducer } from '@/domain/usecases'
import { RuralProducerPostgresRepository } from '@/infra/db/postgres'

export const makeDbDeleteRuralProducer = (): DeleteRuralProducer => {
  const ruralProducerPostgresRepository = new RuralProducerPostgresRepository()
  return new DbDeleteRuralProducer(ruralProducerPostgresRepository)
}
