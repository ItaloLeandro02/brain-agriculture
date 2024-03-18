import type { LoadDashboardRepository } from '@/data/protocols'
import type { LoadDashboard } from '@/domain/usecases'

export class LoadDashboardRepositorySpy implements LoadDashboardRepository {
  callsCount = 0

  async load (): Promise<LoadDashboard.Result> {
    this.callsCount++
    return await Promise.resolve(null)
  }
}
