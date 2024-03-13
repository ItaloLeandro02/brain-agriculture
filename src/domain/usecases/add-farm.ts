export interface AddFarm {
  add: (params: AddFarm.Params) => Promise<number>
}

export namespace AddFarm {
  export type Params = {
    ruralProducerId: number
    name: string
    cityName: string
    state: string
    totalArea: number
    agriculturalArea: number
    vegetationArea: number
  }
}
