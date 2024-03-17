import type { UpdateFarm } from '@/domain/usecases'

export class UpdateFarmSpy implements UpdateFarm {
  params: UpdateFarm.Params

  async update (params: UpdateFarm.Params): Promise<void> {
    this.params = params
    await Promise.resolve()
  }
}
