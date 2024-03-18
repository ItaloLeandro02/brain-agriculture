export interface DeleteFarm {
  delete: (ruralProducerId: number) => Promise<number>
}
