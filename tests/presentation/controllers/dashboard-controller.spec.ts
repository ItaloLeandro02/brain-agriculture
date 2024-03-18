import { DashboardController } from '@/presentation/controllers'
import { serverError } from '@/presentation/helpers'
import { type LoadDashboard } from '@/domain/usecases'
import { throwError } from '@/tests/domain/mocks'

type SutTypes = {
  sut: DashboardController
  loadDashboardSpy: LoadDashboardSpy
}

const makeSut = (): SutTypes => {
  const loadDashboardSpy = new LoadDashboardSpy()
  const sut = new DashboardController(loadDashboardSpy)
  return {
    sut,
    loadDashboardSpy
  }
}

export class LoadDashboardSpy implements LoadDashboard {
  callsCount = 0

  async load (): Promise<LoadDashboard.Result> {
    this.callsCount++
    return await Promise.resolve(null)
  }
}

describe('Dashboard Controller', () => {
  test('Deve chamar LoadDashboard', async () => {
    const { sut, loadDashboardSpy } = makeSut()
    await sut.handle()
    expect(loadDashboardSpy.callsCount).toBe(1)
  })
  test('Deve retornar 500 caoso LoadDashboard falhe', async () => {
    const { sut, loadDashboardSpy } = makeSut()
    jest.spyOn(loadDashboardSpy, 'load').mockImplementationOnce(throwError)
    const response = await sut.handle()
    expect(response).toEqual(serverError(new Error()))
  })
})
