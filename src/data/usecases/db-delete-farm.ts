import type { DeleteFarmRepository } from '@/data/protocols'
import type { DeleteFarm } from '@/domain/usecases'

export class DbDeleteFarm implements DeleteFarm {
  constructor (private readonly deleteFarmRepository: DeleteFarmRepository) {}

  async delete (ruralProducerId: number): Promise<number> {
    return await this.deleteFarmRepository.delete(ruralProducerId)
  }
}
