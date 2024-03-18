import { makeDbLoadDashboard } from '@/main/factories/usecases'
import { DashboardController } from '@/presentation/controllers'

export const makeLoadDashboardController = (): DashboardController => {
  return new DashboardController(makeDbLoadDashboard())
}
