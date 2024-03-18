import { KnexHelper } from '@/infra/db/postgres/helpers'
import type { AddRuralProducerRepository, UpdateRuralProducerRepository } from '@/data/protocols'

export class RuralProducerPostgresRepository implements AddRuralProducerRepository, UpdateRuralProducerRepository {
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

  async update (params: UpdateRuralProducerRepository.Params): Promise<void> {
    await KnexHelper.client
      .update({
        name: params.name,
        cpf_cnpj: params.cpfCnpj
      })
      .from('rural_producer')
      .where('id', params.id)
  }
}
