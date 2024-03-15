import type { Knex } from 'knex'
import { RuralProducerPostgresRepository } from '@/infra/db/postgres'
import { KnexHelper } from '@/infra/db/postgres/helpers'
import { mockAddRuralProducerParams } from '@/tests/domain/mocks'

let ruralProducerTable: Knex

const makeSut = (): RuralProducerPostgresRepository => {
  return new RuralProducerPostgresRepository()
}

describe('RuralProducer Postgres Repository', () => {
  beforeAll(() => {
    KnexHelper.connect()
  })

  afterAll(async () => {
    await KnexHelper.disconnect()
  })

  beforeEach(async () => {
    ruralProducerTable = KnexHelper.getInstance('rural_producer')
    await ruralProducerTable.delete()
  })

  describe('add', () => {
    test('Deve adicionar um produtor rural em caso de sucesso', async () => {
      const sut = makeSut()
      const params = mockAddRuralProducerParams()
      const newRuralProducerId = await sut.add(params)
      const newRuralProducerId2 = await sut.add(params)
      const newRuralProducerId3 = await sut.add(params)
      expect(newRuralProducerId).toBe(1)
      expect(newRuralProducerId2).toBe(2)
      expect(newRuralProducerId3).toBe(3)
    })
  })
})
