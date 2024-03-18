export const dashboardSchema = {
  type: 'object',
  properties: {
    totalFarms: {
      type: 'number'
    },
    totalAreaFarms: {
      type: 'number'
    },
    pieChartState: {
      type: 'array',
      items: {
        $ref: '#/schemas/pieChartState'
      }
    },
    pieChartPlantedCrop: {
      type: 'array',
      items: {
        $ref: '#/schemas/pieChartPlantedCrop'
      }
    },
    pieChartAgriculturalAreaLandUse: {
      type: 'array',
      items: {
        $ref: '#/schemas/pieChartLandUse'
      }
    },
    pieChartVegerationAreaLandUse: {
      type: 'array',
      items: {
        $ref: '#/schemas/pieChartLandUse'
      }
    }
  }
}
