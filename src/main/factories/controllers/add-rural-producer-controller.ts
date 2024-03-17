import { makeAddRuralProducerValidation } from '@/main/factories/controllers'
import { makeDbAddFarm, makeDbAddPlantedCrops, makeDbAddRuralProducer } from '@/main/factories/usecases'
import { AddRuralProducerController } from '@/presentation/controllers'

export const makeAddRuralProducerController = (): AddRuralProducerController => {
  return new AddRuralProducerController(makeAddRuralProducerValidation(), makeDbAddRuralProducer(), makeDbAddFarm(), makeDbAddPlantedCrops())
}
