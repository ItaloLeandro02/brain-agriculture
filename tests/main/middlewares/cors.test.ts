import request from 'supertest'
import type { Express } from 'express'
import { setupApp } from '@/main/config'

let app: Express

describe('CORS Middleware', () => {
  beforeAll(() => {
    app = setupApp()
  })

  test('Deve ativar CORS', async () => {
    app.post('/test_cors', (req, res) => res.send())

    await request(app)
      .get('/test_cors')
      .expect('access-control-allow-origin', '*')
      .expect('access-control-allow-methods', '*')
      .expect('access-control-allow-headers', '*')
  })
})