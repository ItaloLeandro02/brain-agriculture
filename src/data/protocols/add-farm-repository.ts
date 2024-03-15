import type { AddFarm } from '@/domain/usecases'

export interface AddFarmRepository {
  add: (params: AddFarmRepository.Params) => Promise<number>
}

export namespace AddFarmRepository {
  export type Params = AddFarm.Params
}
