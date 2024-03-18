import { DbUpdateFarm } from '@/data/usecases'
import type { UpdateFarm } from '@/domain/usecases'
import { FarmPostgresRepository } from '@/infra/db/postgres'

export const makeDbUpdateFarm = (): UpdateFarm => {
  const farmPostgresRepository = new FarmPostgresRepository()
  return new DbUpdateFarm(farmPostgresRepository)
}
