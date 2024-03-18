export interface DeleteFarmRepository {
  delete: (ruralProducerId: number) => Promise<number>
}
