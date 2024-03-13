export interface AddRuralProducer {
  add: (data: AddRuralProducer.Params) => Promise<number>
}

export namespace AddRuralProducer {
  export type Params = {
    cpfCnpj: string
    name: string
  }
}
