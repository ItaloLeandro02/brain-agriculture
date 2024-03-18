export interface DeletePlantedCropsRepository {
  delete: (farmId: number) => Promise<void>
}
