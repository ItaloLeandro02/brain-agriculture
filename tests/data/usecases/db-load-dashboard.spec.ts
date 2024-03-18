import { DbLoadDashboard } from '@/data/usecases'
import { LoadDashboardRepositorySpy } from '@/tests/data/mocks'
import { throwError } from '@/tests/domain/mocks'

type SutTypes = {
  sut: DbLoadDashboard
  loadDashboardRepositorySpy: LoadDashboardRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadDashboardRepositorySpy = new LoadDashboardRepositorySpy()
  const sut = new DbLoadDashboard(loadDashboardRepositorySpy)
  return {
    sut,
    loadDashboardRepositorySpy
  }
}

describe('DbLoadDashboard UseCase', () => {
  test('Deve chamar LoadDashboardRepository', async () => {
    const { sut, loadDashboardRepositorySpy } = makeSut()
    await sut.load()
    expect(loadDashboardRepositorySpy.callsCount).toBe(1)
  })
  test('Deve lançar uma exceção caso LoadDashboardRepository falhe', async () => {
    const { sut, loadDashboardRepositorySpy } = makeSut()
    jest.spyOn(loadDashboardRepositorySpy, 'load').mockImplementationOnce(throwError)
    const promise = sut.load()
    await expect(promise).rejects.toThrow()
  })
})
