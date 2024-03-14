export class MissinParamError extends Error {
  constructor (paramName: string) {
    super(`O parâmetro ${paramName} deve ser informado`)
  }
}
