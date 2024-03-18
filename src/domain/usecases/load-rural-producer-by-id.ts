export interface LoadRuralProducerById {
  load: (id: number) => Promise<boolean>
}
