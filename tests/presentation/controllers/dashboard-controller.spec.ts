import { DashboardController } from '@/presentation/controllers'
import { ok, serverError } from '@/presentation/helpers'
import { throwError } from '@/tests/domain/mocks'
import { LoadDashboardRepositorySpy } from '@/tests/data/mocks'

type SutTypes = {
  sut: DashboardController
  loadDashboardSpy: LoadDashboardRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadDashboardSpy = new LoadDashboardRepositorySpy()
  const sut = new DashboardController(loadDashboardSpy)
  return {
    sut,
    loadDashboardSpy
  }
}

describe('Dashboard Controller', () => {
  test('Deve chamar LoadDashboard', async () => {
    const { sut, loadDashboardSpy } = makeSut()
    await sut.handle()
    expect(loadDashboardSpy.callsCount).toBe(1)
  })
  test('Deve retornar 500 caso LoadDashboard falhe', async () => {
    const { sut, loadDashboardSpy } = makeSut()
    jest.spyOn(loadDashboardSpy, 'load').mockImplementationOnce(throwError)
    const response = await sut.handle()
    expect(response).toEqual(serverError(new Error()))
  })
  test('Deve retornar 200 em caso de sucesso', async () => {
    const { sut } = makeSut()
    const response = await sut.handle()
    expect(response).toEqual(ok({
      totalFarms: 2,
      totalAreaFarms: 750,
      pieChartState: [{
        state: 'BA',
        percent: 75
      }, {
        state: 'MG',
        percent: 25
      }],
      pieChartPlantedCrop: [{
        name: 'Milho',
        percent: 50
      }, {
        name: 'Cana de Açucar',
        percent: 15
      }, {
        name: 'Soja',
        percent: 35
      }],
      pieChartLandUse: [{
        farmName: 'Fazendinha Feliz',
        percent: 60
      }, {
        farmName: 'Rancho Kent',
        percent: 40
      }]
    }))
  })
})
