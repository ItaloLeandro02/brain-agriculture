import { DbAddFarm } from '@/data/usecases'
import type { AddFarm } from '@/domain/usecases'
import { FarmPostgresRepository } from '@/infra/db/postgres'

export const makeDbAddFarm = (): AddFarm => {
  const farmPostgresRepository = new FarmPostgresRepository()
  return new DbAddFarm(farmPostgresRepository)
}
