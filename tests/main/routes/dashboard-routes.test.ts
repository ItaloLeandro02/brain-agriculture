import request from 'supertest'
import type { Express } from 'express'
import { setupApp } from '@/main/config'
import { KnexHelper } from '@/infra/db/postgres/helpers'

let app: Express

describe('RuralProducer Routes', () => {
  beforeAll(async () => {
    app = await setupApp()
    await KnexHelper.connect()
  })

  afterAll(async () => {
    await KnexHelper.disconnect()
  })

  beforeEach(async () => {
    await KnexHelper.client.delete().from('planted_crop')
    await KnexHelper.client.delete().from('farm')
    await KnexHelper.client.delete().from('rural_producer')
  })

  describe('GET /dashboard', () => {
    test('Deve retornar 200 em caso de sucesso', async () => {
      await request(app)
        .get('/api/dashboard')
        .expect(200)
    })
  })
})
