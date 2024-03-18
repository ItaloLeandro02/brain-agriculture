import type { LoadDashboard } from '@/domain/usecases'

export const mockLoadDashboardResult = (): LoadDashboard.Result => ({
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
  pieChartVegerationAreaLandUse: [{
    farmName: 'Fazendinha Feliz',
    percent: 60
  }, {
    farmName: 'Rancho Kent',
    percent: 40
  }],
  pieChartAgriculturalAreaLandUse: [{
    farmName: 'Fazendinha Feliz',
    percent: 70
  }, {
    farmName: 'Rancho Kent',
    percent: 30
  }]
})
