import type { Router } from 'express'
import { adaptRoute } from '@/main/adapters'
import { makeLoadDashboardController } from '@/main/factories/controllers'

export default (router: Router): void => {
  router.get('/dashboard', adaptRoute(makeLoadDashboardController()))
}
