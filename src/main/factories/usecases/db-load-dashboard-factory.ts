import { DbLoadDashboard } from '@/data/usecases'
import { DashboardPostgresRepository } from '@/infra/db/postgres'

export const makeDbLoadDashboard = (): DbLoadDashboard => {
  const loadDashboardRepository = new DashboardPostgresRepository()
  return new DbLoadDashboard(loadDashboardRepository)
}
