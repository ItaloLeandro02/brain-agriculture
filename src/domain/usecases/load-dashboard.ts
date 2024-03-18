export interface LoadDashboard {
  load: () => Promise<LoadDashboard.Result>
}

export namespace LoadDashboard {
  export type Result = {
    totalFarms: number
    totalAreaFarms: number
    pieChartState: PieChartState[]
    pieChartPlantedCrop: PieChartPlantedCrop[]
    pieChartLandUse: PieChartLandUse[]
  }
  export type PieChartState = {
    state: string
    percent: number
  }
  export type PieChartPlantedCrop = {
    name: string
    percent: number
  }
  export type PieChartLandUse = {
    farmName: string
    percent: number
  }
}
