import type { LoadDashboardRepository } from '@/data/protocols'
import type { LoadDashboard } from '@/domain/usecases'

export class DbLoadDashboard implements LoadDashboard {
  constructor (private readonly loadDashboardRepository: LoadDashboardRepository) {}

  async load (): Promise<LoadDashboard.Result> {
    return await this.loadDashboardRepository.load()
  }
}
