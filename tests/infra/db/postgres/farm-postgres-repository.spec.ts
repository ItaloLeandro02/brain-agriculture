import { FarmPostgresRepository } from '@/infra/db/postgres'
import { KnexHelper } from '@/infra/db/postgres/helpers'
import { mockAddFarmParams, mockUpdateFarmParams } from '@/tests/domain/mocks'

const makeSut = (): FarmPostgresRepository => {
  return new FarmPostgresRepository()
}

describe('Farm Postgres Repository', () => {
  beforeAll(async () => {
    await KnexHelper.connect()
  })

  afterAll(async () => {
    await KnexHelper.disconnect()
  })

  beforeEach(async () => {
    await KnexHelper.client.delete().from('farm')
  })

  describe('add', () => {
    test('Deve adicionar uma fazenda em caso de sucesso', async () => {
      const sut = makeSut()
      const params = mockAddFarmParams()
      const newFarm = await sut.add(params)
      const newFarm2 = await sut.add(params)
      const newFarm3 = await sut.add(params)
      expect(newFarm).toBeGreaterThan(0)
      expect(newFarm2).toBe(newFarm + 1)
      expect(newFarm3).toBe(newFarm2 + 1)
    })
  })
  describe('update', () => {
    test('Deve atualizar uma fazenda em caso de sucesso', async () => {
      const sut = makeSut()
      const addParams = mockAddFarmParams()
      const newFarmId = await sut.add(addParams)
      let farmDatabase = await KnexHelper.client.select('*').from('farm')
      expect(farmDatabase).toHaveLength(1)
      expect(farmDatabase[0].id).toBeGreaterThan(0)
      expect(farmDatabase[0].rural_producer_id).toBe(addParams.ruralProducerId)
      expect(farmDatabase[0].name).toBe(addParams.name)
      expect(farmDatabase[0].city_name).toBe(addParams.cityName)
      expect(farmDatabase[0].state).toBe(addParams.state)
      expect(parseFloat(farmDatabase[0].total_area)).toBe(addParams.totalArea)
      expect(parseFloat(farmDatabase[0].agricultural_area)).toBe(addParams.agriculturalArea)
      expect(parseFloat(farmDatabase[0].vegetation_area)).toBe(addParams.vegetationArea)
      const updateParams = mockUpdateFarmParams(addParams.ruralProducerId)
      const updatedFarmId = await sut.update(updateParams)
      farmDatabase = await KnexHelper.client.select('*').from('farm')
      expect(updatedFarmId).toBe(newFarmId)
      expect(farmDatabase).toHaveLength(1)
      expect(farmDatabase[0].id).toBeGreaterThan(0)
      expect(farmDatabase[0].rural_producer_id).toBe(updateParams.ruralProducerId)
      expect(farmDatabase[0].name).toBe(updateParams.name)
      expect(farmDatabase[0].city_name).toBe(updateParams.cityName)
      expect(farmDatabase[0].state).toBe(updateParams.state)
      expect(parseFloat(farmDatabase[0].total_area)).toBe(updateParams.totalArea)
      expect(parseFloat(farmDatabase[0].agricultural_area)).toBe(updateParams.agriculturalArea)
      expect(parseFloat(farmDatabase[0].vegetation_area)).toBe(updateParams.vegetationArea)
    })
  })
  describe('delete', () => {
    test('Deve deletar uma fazenda em caso de sucesso', async () => {
      const sut = makeSut()
      const addParams = mockAddFarmParams()
      const newFarmId = await sut.add(addParams)
      let farmDatabase = await KnexHelper.client.select('*').from('farm')
      expect(farmDatabase).toHaveLength(1)
      expect(farmDatabase[0].id).toBeGreaterThan(0)
      expect(farmDatabase[0].rural_producer_id).toBe(addParams.ruralProducerId)
      expect(farmDatabase[0].name).toBe(addParams.name)
      expect(farmDatabase[0].city_name).toBe(addParams.cityName)
      expect(farmDatabase[0].state).toBe(addParams.state)
      expect(parseFloat(farmDatabase[0].total_area)).toBe(addParams.totalArea)
      expect(parseFloat(farmDatabase[0].agricultural_area)).toBe(addParams.agriculturalArea)
      expect(parseFloat(farmDatabase[0].vegetation_area)).toBe(addParams.vegetationArea)
      const deleteddFarmId = await sut.delete(addParams.ruralProducerId)
      farmDatabase = await KnexHelper.client.select('*').from('farm')
      expect(deleteddFarmId).toBe(newFarmId)
      expect(farmDatabase).toHaveLength(0)
    })
  })
})
