import request from 'supertest'
import type { Express } from 'express'
import { setupApp } from '@/main/config'
import { KnexHelper } from '@/infra/db/postgres/helpers'
import { mockAddRuralProducerParams, mockAddFarmParams, mockAddPlantedCropsParams, mockUpdatePlantedCropsParams } from '@/tests/domain/mocks'

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

  describe('POST /rural-producer', () => {
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
  describe('PUT /rural-producer/:id', () => {
    test('Deve retornar 204 em caso de sucesso', async () => {
      const addRuralProducerParams = mockAddRuralProducerParams()
      const [{ id: ruralProducerId }] = await KnexHelper.client
        .insert({
          name: addRuralProducerParams.name,
          cpf_cnpj: addRuralProducerParams.cpfCnpj
        })
        .into('rural_producer')
        .returning('id')
      const addFarmParams = mockAddFarmParams()
      const [{ id: farmId }] = await KnexHelper.client
        .insert({
          rural_producer_id: ruralProducerId,
          name: addFarmParams.name,
          city_name: addFarmParams.cityName,
          state: addFarmParams.state,
          total_area: addFarmParams.totalArea,
          agricultural_area: addFarmParams.agriculturalArea,
          vegetation_area: addFarmParams.vegetationArea
        })
        .into('farm')
        .returning('id')
      const addPlantedCropsParams = mockAddPlantedCropsParams()
      await KnexHelper.client
        .insert([{
          farm_id: farmId,
          name: addPlantedCropsParams.plantedCrops[0]
        }, {
          farm_id: farmId,
          name: addPlantedCropsParams.plantedCrops[1]
        }])
        .into('planted_crop')

      const { name: farmName, ...farmParams } = mockAddFarmParams()
      const { plantedCrops } = mockUpdatePlantedCropsParams()
      const params = {
        ...mockAddRuralProducerParams(),
        ...farmParams,
        farmName,
        plantedCrops
      }
      await request(app)
        .put(`/api/rural-producer/${ruralProducerId}`)
        .send(params)
        .expect(204)
    })
  })
})
