import type { LoadDashboard } from '@/domain/usecases'

export interface LoadDashboardRepository {
  load: () => Promise<LoadDashboardRepository.Result>
}

export namespace LoadDashboardRepository {
  export type Result = LoadDashboard.Result
  export type PieChartState = LoadDashboard.PieChartState
  export type PieChartPlantedCrop = LoadDashboard.PieChartPlantedCrop
  export type PieChartLandUse = LoadDashboard.PieChartLandUse
}
