export interface AddPlantedCrops {
  add: (params: AddPlantedCrops.Params) => Promise<void>
}

export namespace AddPlantedCrops {
  export type Params = {
    farmId: number
    plantedCrops: string[]
  }
}
