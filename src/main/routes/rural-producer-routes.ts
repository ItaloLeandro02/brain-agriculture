import type { Router } from 'express'
import { adaptRoute } from '@/main/adapters'
import { makeAddRuralProducerController } from '@/main/factories/controllers'

export default (router: Router): void => {
  router.post('/rural-producer', adaptRoute(makeAddRuralProducerController()))
}
