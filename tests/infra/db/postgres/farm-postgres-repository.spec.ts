import type { Knex } from 'knex'
import { faker } from '@faker-js/faker'
import { FarmPostgresRepository } from '@/infra/db/postgres'
import { KnexHelper } from '@/infra/db/postgres/helpers'
import type { AddFarmRepository } from '@/data/protocols'

let farmTable: Knex

const makeSut = (): FarmPostgresRepository => {
  return new FarmPostgresRepository()
}

const mockParams = (): AddFarmRepository.Params => ({
  ruralProducerId: faker.number.int({ min: 1, max: 100 }),
  name: faker.company.name(),
  cityName: faker.location.city(),
  state: 'MG',
  totalArea: 300,
  agriculturalArea: 250,
  vegetationArea: 50
})

describe('Farm Postgres Repository', () => {
  beforeAll(() => {
    KnexHelper.connect()
  })

  afterAll(async () => {
    await KnexHelper.disconnect()
  })

  beforeEach(async () => {
    farmTable = KnexHelper.getInstance('farm')
    await farmTable.delete()
  })

  describe('add', () => {
    test('Deve adicionar uma fazenda em caso de sucesso', async () => {
      const sut = makeSut()
      const params = mockParams()
      const newFarm = await sut.add(params)
      const newFarm2 = await sut.add(params)
      const newFarm3 = await sut.add(params)
      expect(newFarm).toBe(1)
      expect(newFarm2).toBe(2)
      expect(newFarm3).toBe(3)
    })
  })
})
