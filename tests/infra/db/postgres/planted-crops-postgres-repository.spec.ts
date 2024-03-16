import { PlantedCropsPostgresRepository } from '@/infra/db/postgres'
import { KnexHelper } from '@/infra/db/postgres/helpers'
import { mockAddPlantedCropsParams } from '@/tests/domain/mocks'

const makeSut = (): PlantedCropsPostgresRepository => {
  return new PlantedCropsPostgresRepository()
}

describe('PlantedCrops Postgres Repository', () => {
  beforeAll(() => {
    KnexHelper.connect()
  })

  afterAll(async () => {
    await KnexHelper.disconnect()
  })

  beforeEach(async () => {
    await KnexHelper.client.delete().from('planted_crop')
  })

  describe('add', () => {
    test('Deve adicionar uma cultura plantada em caso de sucesso', async () => {
      const sut = makeSut()
      const params = mockAddPlantedCropsParams()
      await sut.add(params)
      const params2 = mockAddPlantedCropsParams()
      await sut.add(params2)
      const plantedCropsDatabase = await KnexHelper.client
        .select('*')
        .from('planted_crop')
      expect(plantedCropsDatabase).toEqual([{
        id: 1,
        farm_id: params.farmId,
        name: params.plantedCrops[0]
      }, {
        id: 2,
        farm_id: params.farmId,
        name: params.plantedCrops[1]
      }, {
        id: 3,
        farm_id: params2.farmId,
        name: params2.plantedCrops[0]
      }, {
        id: 4,
        farm_id: params2.farmId,
        name: params2.plantedCrops[1]
      }])
    })
  })
})
