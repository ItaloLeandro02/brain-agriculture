import type { Router } from 'express'

export default (router: Router): void => {
  router.post('/rural-producer', (req, res) => {
    res.json({ status: 'ok' })
  })
}
