import type { UpdateFarm } from '@/domain/usecases'

export interface UpdateFarmRepository {
  update: (params: UpdateFarmRepository.Params) => Promise<number>
}

export namespace UpdateFarmRepository {
  export type Params = UpdateFarm.Params
}
