import { PlantedCropsPostgresRepository } from '@/infra/db/postgres'
import { KnexHelper } from '@/infra/db/postgres/helpers'
import { mockAddPlantedCropsParams, mockUpdatePlantedCropsParams } from '@/tests/domain/mocks'

const makeSut = (): PlantedCropsPostgresRepository => {
  return new PlantedCropsPostgresRepository()
}

describe('PlantedCrops Postgres Repository', () => {
  beforeAll(async () => {
    await KnexHelper.connect()
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
        id: plantedCropsDatabase[0].id,
        farm_id: params.farmId,
        name: params.plantedCrops[0]
      }, {
        id: plantedCropsDatabase[1].id,
        farm_id: params.farmId,
        name: params.plantedCrops[1]
      }, {
        id: plantedCropsDatabase[2].id,
        farm_id: params2.farmId,
        name: params2.plantedCrops[0]
      }, {
        id: plantedCropsDatabase[3].id,
        farm_id: params2.farmId,
        name: params2.plantedCrops[1]
      }])
    })
  })
  describe('update', () => {
    test('Deve atualizar uma cultura plantada em caso de sucesso', async () => {
      const sut = makeSut()
      const params = mockAddPlantedCropsParams()
      await sut.add(params)
      let plantedCropsDatabase = await KnexHelper.client.select('*').from('planted_crop')
      expect(plantedCropsDatabase).toHaveLength(2)
      expect(plantedCropsDatabase[0].id).toBeGreaterThan(0)
      expect(plantedCropsDatabase[0].farm_id).toBe(params.farmId)
      expect(plantedCropsDatabase[0].name).toBe(params.plantedCrops[0])
      expect(plantedCropsDatabase[1].id).toBeGreaterThan(0)
      expect(plantedCropsDatabase[1].farm_id).toBe(params.farmId)
      expect(plantedCropsDatabase[1].name).toBe(params.plantedCrops[1])
      const updateParams = mockUpdatePlantedCropsParams(params.farmId)
      await sut.update(updateParams)
      plantedCropsDatabase = await KnexHelper.client.select('*').from('planted_crop')
      expect(plantedCropsDatabase).toHaveLength(3)
      expect(plantedCropsDatabase[0].id).toBeGreaterThan(0)
      expect(plantedCropsDatabase[0].farm_id).toBe(updateParams.farmId)
      expect(plantedCropsDatabase[0].name).toBe(updateParams.plantedCrops[0])
      expect(plantedCropsDatabase[1].id).toBeGreaterThan(0)
      expect(plantedCropsDatabase[1].farm_id).toBe(updateParams.farmId)
      expect(plantedCropsDatabase[1].name).toBe(updateParams.plantedCrops[1])
      expect(plantedCropsDatabase[2].id).toBeGreaterThan(0)
      expect(plantedCropsDatabase[2].farm_id).toBe(updateParams.farmId)
      expect(plantedCropsDatabase[2].name).toBe(updateParams.plantedCrops[2])
    })
  })
})
