import { addRuralProducerParamsSchema } from './schemas/add-rural-producer-params-schema'
import { dashboardSchema } from './schemas/dashboard'
import { errorSchema } from './schemas/error-schema'
import { pieChartLandUseSchema } from './schemas/pie-chart-land-use'
import { pieChartPlantedCropSchema } from './schemas/pie-chart-planted-crop-schema'
import { pieChartStateSchema } from './schemas/pie-chart-state-schema'

export default {
  addRuralProducerParams: addRuralProducerParamsSchema,
  dashboard: dashboardSchema,
  error: errorSchema,
  pieChartLandUse: pieChartLandUseSchema,
  pieChartPlantedCrop: pieChartPlantedCropSchema,
  pieChartState: pieChartStateSchema
}
