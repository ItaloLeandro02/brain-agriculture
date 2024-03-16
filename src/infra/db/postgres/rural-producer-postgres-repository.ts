import { KnexHelper } from '@/infra/db/postgres/helpers'
import type { AddRuralProducerRepository } from '@/data/protocols'

export class RuralProducerPostgresRepository implements AddRuralProducerRepository {
  async add (params: AddRuralProducerRepository.Params): Promise<number> {
    const [result] = await KnexHelper.client
      .insert({
        name: params.name,
        cpf_cnpj: params.cpfCnpj
      })
      .into('rural_producer')
      .returning('id')
    return result.id
  }
}
