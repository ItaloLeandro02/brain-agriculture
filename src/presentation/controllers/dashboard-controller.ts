import type { Controller, HttpResponse } from '@/presentation/protocols'
import type { LoadDashboard } from '@/domain/usecases'

export class DashboardController implements Controller {
  constructor (private readonly loadDashboard: LoadDashboard) {}

  async handle (): Promise<HttpResponse> {
    await this.loadDashboard.load()
    return null
  }
}
