export interface UpdateFarm {
  update: (params: UpdateFarm.Params) => Promise<void>
}

export namespace UpdateFarm {
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
