export interface DeletePlantedCrops {
  delete: (farmId: number) => Promise<void>
}
