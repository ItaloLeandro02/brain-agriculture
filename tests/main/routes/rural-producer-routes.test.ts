import request from 'supertest'
import type { Express } from 'express'
import { setupApp } from '@/main/config'
import { KnexHelper } from '@/infra/db/postgres/helpers'
import { mockAddRuralProducerParams, mockAddFarmParams, mockAddPlantedCropsParams } from '@/tests/domain/mocks'

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

  test('Deve retornar 204 em caso de sucesso', async () => {
    const { ruralProducerId, name: farmName, ...farmParams } = mockAddFarmParams()
    const { plantedCrops } = mockAddPlantedCropsParams()
    const params = {
      ...mockAddRuralProducerParams(),
      ...farmParams,
      farmName,
      plantedCrops
    }
    await request(app)
      .post('/api/rural-producer')
      .send(params)
      .expect(204)
  })
})
