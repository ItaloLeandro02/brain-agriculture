import type { Controller, HttpResponse } from '@/presentation/protocols'
import { serverError } from '@/presentation/helpers'
import type { LoadDashboard } from '@/domain/usecases'

export class DashboardController implements Controller {
  constructor (private readonly loadDashboard: LoadDashboard) {}

  async handle (): Promise<HttpResponse> {
    try {
      await this.loadDashboard.load()
      return null
    } catch (error) {
      return serverError(error as Error)
    }
  }
}
