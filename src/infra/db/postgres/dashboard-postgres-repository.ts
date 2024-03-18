import { KnexHelper } from '@/infra/db/postgres/helpers'
import type { LoadDashboardRepository } from '@/data/protocols'
import { roundNumber } from '@/utils'

export class DashboardPostgresRepository implements LoadDashboardRepository {
  async load (): Promise<LoadDashboardRepository.Result> {
    const farmData = await KnexHelper.client
      .select('*')
      .from('farm')
    const plantedCropData = await KnexHelper.client
      .select('*')
      .from('planted_crop')

    const totalFarms = farmData.length
    const totalArea = farmData.reduce((total, farm) => total + parseFloat(farm.total_area), 0)
    return {
      totalFarms,
      totalAreaFarms: totalArea,
      pieChartState: this.getPieChartState(farmData, totalFarms),
      pieChartPlantedCrop: this.getPieChartPlantedCrop(plantedCropData),
      pieChartAgriculturalAreaLandUse: this.getPieChartLandUse(farmData, 'agricultural_area'),
      pieChartVegetationAreaLandUse: this.getPieChartLandUse(farmData, 'vegetation_area')
    }
  }

  private getPieChartState (farmData: DashboardPostgresRepository.FarmRaw[], totalFarms: number): LoadDashboardRepository.PieChartState[] {
    const statesData: Array<{ state: string, total: number }> = []
    for (const farm of farmData) {
      const stateData = statesData.find(({ state }) => state === farm.state)
      if (stateData) {
        stateData.total++
        continue
      }
      statesData.push({ state: farm.state, total: 1 })
    }
    return statesData.map(({ state, total }) => ({
      state,
      percent: roundNumber(total / totalFarms * 100)
    }))
  }

  private getPieChartLandUse (farmData: DashboardPostgresRepository.FarmRaw[], fieldName: string): LoadDashboardRepository.PieChartLandUse[] {
    let totalArea = 0
    const areasInfo: Array<{ farmName: string, total: number }> = []
    for (const farm of farmData) {
      const parsedArea = parseFloat(farm[fieldName])
      totalArea += parsedArea
      const areaInfo = areasInfo.find(({ farmName }) => farmName === farm.name)
      if (areaInfo) {
        areaInfo.total += parsedArea
        continue
      }
      areasInfo.push({ farmName: farm.name, total: parsedArea })
    }
    return areasInfo.map(({ farmName, total }) => ({
      farmName,
      percent: roundNumber(total / totalArea * 100)
    }))
  }

  private getPieChartPlantedCrop (plantedCropsData: DashboardPostgresRepository.PlantedCropRaw[]): LoadDashboardRepository.PieChartPlantedCrop[] {
    const totalPlantedCrops = plantedCropsData.length
    const plantedCropsInfo: Array<{ name: string, total: number }> = []
    for (const plantedCrop of plantedCropsData) {
      const plantedCropInfo = plantedCropsInfo.find(({ name }) => name === plantedCrop.name)
      if (plantedCropInfo) {
        plantedCropInfo.total++
        continue
      }
      plantedCropsInfo.push({ name: plantedCrop.name, total: 1 })
    }
    return plantedCropsInfo.map(({ name, total }) => ({
      name,
      percent: Number(Math.round(parseFloat(total / totalPlantedCrops * 100 + 'e' + 2)) + 'e-' + 2)
    }))
  }
}

namespace DashboardPostgresRepository {
  export type FarmRaw = {
    id: number
    rural_producer_id: number
    name: string
    city_name: string
    state: string
    total_area: string
    agricultural_area: string
    vegetation_area: string
  }
  export type PlantedCropRaw = {
    id: number
    farm_id: number
    name: string
  }
}
