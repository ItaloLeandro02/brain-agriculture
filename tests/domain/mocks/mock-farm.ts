import { faker } from '@faker-js/faker'
import type { AddFarm, UpdateFarm } from '@/domain/usecases'

export const mockAddFarmParams = (): AddFarm.Params => ({
  ruralProducerId: faker.number.int({ min: 1, max: 100 }),
  name: faker.company.name(),
  cityName: faker.location.city(),
  state: 'MG',
  totalArea: 300,
  agriculturalArea: 250,
  vegetationArea: 50
})

export const mockUpdateFarmParams = (ruralProducerId = faker.number.int({ min: 1, max: 100 })): UpdateFarm.Params => ({
  ruralProducerId,
  name: faker.company.name(),
  cityName: faker.location.city(),
  state: 'MG',
  totalArea: 300,
  agriculturalArea: 250,
  vegetationArea: 50
})
