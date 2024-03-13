export interface AddRuralProducer {
  add: (data: AddRuralProducer.Params) => Promise<void>
}

export namespace AddRuralProducer {
  export type Params = {
    cpfCnpj: string
    name: string
  }
}
