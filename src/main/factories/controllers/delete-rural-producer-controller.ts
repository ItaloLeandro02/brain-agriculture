import { makeDbLoadRuralProducerById, makeDbDeleteFarm, makeDbDeletePlantedCrops, makeDbDeleteRuralProducer } from '@/main/factories/usecases'
import { DeleteRuralProducerController } from '@/presentation/controllers'

export const makeDeleteRuralProducerController = (): DeleteRuralProducerController => {
  return new DeleteRuralProducerController(makeDbLoadRuralProducerById(), makeDbDeleteRuralProducer(), makeDbDeleteFarm(), makeDbDeletePlantedCrops())
}
