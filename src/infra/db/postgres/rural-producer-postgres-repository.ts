import { KnexHelper } from '@/infra/db/postgres/helpers'
import type { AddRuralProducerRepository, DeleteRuralProducerRepository, LoadRuralProducerByIdRepository, UpdateRuralProducerRepository } from '@/data/protocols'

export class RuralProducerPostgresRepository implements AddRuralProducerRepository, LoadRuralProducerByIdRepository, UpdateRuralProducerRepository, DeleteRuralProducerRepository {
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

  async load (id: number): Promise<boolean> {
    const data = await KnexHelper.client
      .select('id')
      .from('rural_producer')
      .where('id', id)
      .first()
    return !!data
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

  async delete (id: number): Promise<void> {
    await KnexHelper.client
      .delete()
      .from('rural_producer')
      .where('id', id)
  }
}
