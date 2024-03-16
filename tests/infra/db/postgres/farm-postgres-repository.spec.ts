import { FarmPostgresRepository } from '@/infra/db/postgres'
import { KnexHelper } from '@/infra/db/postgres/helpers'
import { mockAddFarmParams } from '@/tests/domain/mocks'

const makeSut = (): FarmPostgresRepository => {
  return new FarmPostgresRepository()
}

describe('Farm Postgres Repository', () => {
  beforeAll(() => {
    KnexHelper.connect()
  })

  afterAll(async () => {
    await KnexHelper.disconnect()
  })

  beforeEach(async () => {
    await KnexHelper.client.delete().from(('farm'))
  })

  describe('add', () => {
    test('Deve adicionar uma fazenda em caso de sucesso', async () => {
      const sut = makeSut()
      const params = mockAddFarmParams()
      const newFarm = await sut.add(params)
      const newFarm2 = await sut.add(params)
      const newFarm3 = await sut.add(params)
      expect(newFarm).toBe(1)
      expect(newFarm2).toBe(2)
      expect(newFarm3).toBe(3)
    })
  })
})