import type { Router } from 'express'
import { adaptRoute } from '@/main/adapters'
import { makeAddRuralProducerController, makeDeleteRuralProducerController, makeUpdateRuralProducerController } from '@/main/factories/controllers'

export default (router: Router): void => {
  router.post('/rural-producer', adaptRoute(makeAddRuralProducerController()))
  router.put('/rural-producer/:id', adaptRoute(makeUpdateRuralProducerController()))
  router.delete('/rural-producer/:id', adaptRoute(makeDeleteRuralProducerController()))
}
