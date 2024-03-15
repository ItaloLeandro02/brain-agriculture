import { faker } from '@faker-js/faker'
import type { AddFarm } from '@/domain/usecases'

export const mockAddFarmParams = (): AddFarm.Params => ({
  ruralProducerId: faker.number.int({ min: 1, max: 100 }),
  name: faker.company.name(),
  cityName: faker.location.city(),
  state: 'MG',
  totalArea: 300,
  agriculturalArea: 250,
  vegetationArea: 50
})
