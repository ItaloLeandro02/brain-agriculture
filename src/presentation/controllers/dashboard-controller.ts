import type { Controller, HttpResponse } from '@/presentation/protocols'
import { ok, serverError } from '@/presentation/helpers'
import type { LoadDashboard } from '@/domain/usecases'

export class DashboardController implements Controller {
  constructor (private readonly loadDashboard: LoadDashboard) {}

  async handle (): Promise<HttpResponse> {
    try {
      const data = await this.loadDashboard.load()
      return ok(data)
    } catch (error) {
      return serverError(error as Error)
    }
  }
}
