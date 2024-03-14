import { KnexHelper } from '@/infra/db/postgres/helpers'
import type { AddRuralProducerRepository } from '@/data/protocols'

export class RuralProducerPostgresRepository implements AddRuralProducerRepository {
  async add (params: AddRuralProducerRepository.Params): Promise<number> {
    const ruralProducerTable = KnexHelper.getInstance('rural_producer')
    const [result] = await ruralProducerTable
      .insert({
        name: params.name,
        cpf_cnpj: params.cpfCnpj
      })
      .returning('id')
    return result.id
  }
}
