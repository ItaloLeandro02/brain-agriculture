import type { Knex } from 'knex'
import { faker } from '@faker-js/faker'
import { RuralProducerPostgresRepository } from '@/infra/db/postgres'
import { KnexHelper } from '@/infra/db/postgres/helpers'
import type { AddRuralProducerRepository } from '@/data/protocols'

let ruralProducerTable: Knex

const makeSut = (): RuralProducerPostgresRepository => {
  return new RuralProducerPostgresRepository()
}

const mockParams = (): AddRuralProducerRepository.Params => ({
  cpfCnpj: '852.415.280-08',
  name: faker.person.fullName()
})

describe('RuralProducer Postgres Repository', () => {
	beforeAll(() => {
		KnexHelper.connect()
  })

  afterAll(() => {
		KnexHelper.disconnect()
  })

  beforeEach(async () => {
		ruralProducerTable = KnexHelper.getInstance('rural_producer')
		await ruralProducerTable.delete()
  })

  describe('add', () => {
    test('Deve adicionar um produtor rural em caso de sucesso', async () => {
      const sut = makeSut()
      const params = mockParams()
      const newRuralProducerId = await sut.add(params)
      const newRuralProducerId2 = await sut.add(params)
      const newRuralProducerId3 = await sut.add(params)
			expect(newRuralProducerId).toBe(1)
			expect(newRuralProducerId2).toBe(2)
			expect(newRuralProducerId3).toBe(3)
    })
  })
})
