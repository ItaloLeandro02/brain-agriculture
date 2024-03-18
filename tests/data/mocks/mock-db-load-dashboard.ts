import type { LoadDashboardRepository } from '@/data/protocols'
import type { LoadDashboard } from '@/domain/usecases'
import { mockLoadDashboardResult } from '@/tests/domain/mocks'

export class LoadDashboardRepositorySpy implements LoadDashboardRepository {
  callsCount = 0
  result = mockLoadDashboardResult()

  async load (): Promise<LoadDashboard.Result> {
    this.callsCount++
    return await Promise.resolve(this.result)
  }
}
