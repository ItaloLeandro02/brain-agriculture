import { makeUpdateRuralProducerValidation } from '@/main/factories/controllers'
import { makeDbUpdateFarm, makeDbUpdatePlantedCrops, makeDbUpdateRuralProducer } from '@/main/factories/usecases'
import { UpdateRuralProducerController } from '@/presentation/controllers'

export const makeUpdateRuralProducerController = (): UpdateRuralProducerController => {
  return new UpdateRuralProducerController(makeUpdateRuralProducerValidation(), makeDbUpdateRuralProducer(), makeDbUpdateFarm(), makeDbUpdatePlantedCrops())
}
