export interface UpdatePlantedCrops {
  update: (params: UpdatePlantedCrops.Params) => Promise<void>
}

export namespace UpdatePlantedCrops {
  export type Params = {
    farmId: number
    plantedCrops: string[]
  }
}
