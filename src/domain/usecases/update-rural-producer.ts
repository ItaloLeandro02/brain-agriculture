export interface UpdateRuralProducer {
  update: (params: UpdateRuralProducer.Params) => Promise<void>
}

export namespace UpdateRuralProducer {
  export type Params = {
    id: number
    cpfCnpj: string
    name: string
  }
}
