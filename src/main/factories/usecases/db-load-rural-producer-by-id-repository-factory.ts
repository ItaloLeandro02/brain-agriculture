import { DbLoadRuralProducerById } from '@/data/usecases'
import { type LoadRuralProducerById } from '@/domain/usecases'
import { RuralProducerPostgresRepository } from '@/infra/db/postgres'

export const makeDbLoadRuralProducerById = (): LoadRuralProducerById => {
  const ruralProducerPostgresRepository = new RuralProducerPostgresRepository()
  return new DbLoadRuralProducerById(ruralProducerPostgresRepository)
}
