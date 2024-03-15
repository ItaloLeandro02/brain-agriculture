import { faker } from '@faker-js/faker'
import type { AddPlantedCrops } from '@/domain/usecases'

export const mockAddPlantedCropsParams = (): AddPlantedCrops.Params => ({
  farmId: faker.number.int({ min: 1, max: 100 }),
  plantedCrops: ['Cana de açucar', 'Soja']
})
