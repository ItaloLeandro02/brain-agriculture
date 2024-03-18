export interface LoadRuralProducerByIdRepository {
  load: (id: number) => Promise<boolean>
}
