import { dashboardPath } from './paths/dashboard-path'
import { addRuralProducerPath, updateOrDeleteRuralProducerPath } from './paths/rural-producer-path'

export default {
  '/rural-producer': addRuralProducerPath,
  '/rural-producer/{id}': updateOrDeleteRuralProducerPath,
  '/dashboard': dashboardPath
}
