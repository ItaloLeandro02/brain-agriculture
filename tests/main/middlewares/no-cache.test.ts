import request from 'supertest'
import { type Express } from 'express'
import { setupApp } from '@/main/config'
import { noCache } from '@/main/middlewares'

let app: Express

describe('No Cache Middleware', () => {
  beforeAll(async () => {
    app = await setupApp()
  })

  test('Deve desabilitar cache', async () => {
    app.get('/test_no_cache', noCache, (req, res) => res.send())

    await request(app)
      .get('/test_no_cache')
      .expect('cache-control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
      .expect('pragman', 'no-cache')
      .expect('expires', '0')
      .expect('surrogate-control', 'no-store')
  })
})
