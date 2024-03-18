import { DbDeleteFarm } from '@/data/usecases'
import type { DeleteFarm } from '@/domain/usecases'
import { FarmPostgresRepository } from '@/infra/db/postgres'

export const makeDbDeleteFarm = (): DeleteFarm => {
  const farmPostgresRepository = new FarmPostgresRepository()
  return new DbDeleteFarm(farmPostgresRepository)
}
