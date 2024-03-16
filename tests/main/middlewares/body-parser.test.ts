import request from 'supertest'
import type { Express } from 'express'
import { setupApp } from '@/main/config'

let app: Express

describe('Body Parser Middleware', () => {
  beforeAll(() => {
    app = setupApp()
  })

  test('Deve realizar o parse do body para json', async () => {
    app.post('/test_body_parser', (req, res) => res.send(req.body))

    await request(app)
      .post('/test_body_parser')
      .send({ name: 'Italo' })
      .expect({ name: 'Italo' })
  })
})
