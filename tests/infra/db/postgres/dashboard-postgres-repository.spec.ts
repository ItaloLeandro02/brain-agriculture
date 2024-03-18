import { KnexHelper } from '@/infra/db/postgres/helpers'
import { DashboardPostgresRepository } from '@/infra/db/postgres'
import { mockAddRuralProducerParams } from '@/tests/domain/mocks'

const makeSut = (): DashboardPostgresRepository => {
  return new DashboardPostgresRepository()
}

const mockFarmInBaWithThreePlantedCrops = async (): Promise<void> => {
  const addRuralProducerParams = mockAddRuralProducerParams()
  const [{ id: ruralProducerId }] = await KnexHelper.client
    .insert({
      name: 'Ciclano da Silva',
      cpf_cnpj: addRuralProducerParams.cpfCnpj
    })
    .into('rural_producer')
    .returning('id')
  const [{ id: farmId }] = await KnexHelper.client
    .insert({
      rural_producer_id: ruralProducerId,
      name: 'Fazendinha feliz',
      city_name: 'Itanhém',
      state: 'BA',
      total_area: 375,
      agricultural_area: 273,
      vegetation_area: 102
    })
    .into('farm')
    .returning('id')
  await KnexHelper.client
    .insert([{
      farm_id: farmId,
      name: 'Café'
    }, {
      farm_id: farmId,
      name: 'Cana de Açucar'
    }, {
      farm_id: farmId,
      name: 'Milho'
    }])
    .into('planted_crop')
}
const mockFarmInBaWithFourPlantedCrops = async (): Promise<void> => {
  const addRuralProducerParams = mockAddRuralProducerParams()
  const [{ id: ruralProducerId }] = await KnexHelper.client
    .insert({
      name: 'Jerolsvaldo Antônio Rodrigues',
      cpf_cnpj: addRuralProducerParams.cpfCnpj
    })
    .into('rural_producer')
    .returning('id')
  const [{ id: farmId }] = await KnexHelper.client
    .insert({
      rural_producer_id: ruralProducerId,
      name: 'Pedaço do Céu',
      city_name: 'Teixeira de Freitas',
      state: 'BA',
      total_area: 609,
      agricultural_area: 401,
      vegetation_area: 208
    })
    .into('farm')
    .returning('id')
  await KnexHelper.client
    .insert([{
      farm_id: farmId,
      name: 'Melância'
    }, {
      farm_id: farmId,
      name: 'Cana de Açucar'
    }, {
      farm_id: farmId,
      name: 'Café'
    }, {
      farm_id: farmId,
      name: 'Milho'
    }])
    .into('planted_crop')
}
const mockFarmInMGWithFivePlantedCrops = async (): Promise<void> => {
  const addRuralProducerParams = mockAddRuralProducerParams()
  const [{ id: ruralProducerId }] = await KnexHelper.client
    .insert({
      name: 'Marco Polo dos Santos',
      cpf_cnpj: addRuralProducerParams.cpfCnpj
    })
    .into('rural_producer')
    .returning('id')
  const [{ id: farmId }] = await KnexHelper.client
    .insert({
      rural_producer_id: ruralProducerId,
      name: 'Fazenda Água Viva',
      city_name: 'Ipatinga',
      state: 'MG',
      total_area: 478,
      agricultural_area: 169,
      vegetation_area: 309
    })
    .into('farm')
    .returning('id')
  await KnexHelper.client
    .insert([{
      farm_id: farmId,
      name: 'Soja'
    }, {
      farm_id: farmId,
      name: 'Cana de Açucar'
    }, {
      farm_id: farmId,
      name: 'Milho'
    }, {
      farm_id: farmId,
      name: 'Algodão'
    }, {
      farm_id: farmId,
      name: 'Café'
    }])
    .into('planted_crop')
}
const mockFarmInSPWithTwoPlantedCrops = async (): Promise<void> => {
  const addRuralProducerParams = mockAddRuralProducerParams()
  const [{ id: ruralProducerId }] = await KnexHelper.client
    .insert({
      name: 'Carlito Bragança Neto',
      cpf_cnpj: addRuralProducerParams.cpfCnpj
    })
    .into('rural_producer')
    .returning('id')
  const [{ id: farmId }] = await KnexHelper.client
    .insert({
      rural_producer_id: ruralProducerId,
      name: 'Fazenda Alcalina',
      city_name: 'São Paulo',
      state: 'SP',
      total_area: 768,
      agricultural_area: 598,
      vegetation_area: 170
    })
    .into('farm')
    .returning('id')
  await KnexHelper.client
    .insert([{
      farm_id: farmId,
      name: 'Café'
    }, {
      farm_id: farmId,
      name: 'Algodão'
    }])
    .into('planted_crop')
}

describe('Dashboard Postgres Repository', () => {
  beforeAll(async () => {
    await KnexHelper.connect()
  })

  afterAll(async () => {
    await KnexHelper.disconnect()
  })

  beforeEach(async () => {
    await KnexHelper.client.delete().from('planted_crop')
    await KnexHelper.client.delete().from('farm')
    await KnexHelper.client.delete().from('rural_producer')
  })

  describe('load', () => {
    test('Deve retornar os dados do dashboard em caso de sucesso', async () => {
      await mockFarmInBaWithThreePlantedCrops()
      await mockFarmInBaWithFourPlantedCrops()
      await mockFarmInMGWithFivePlantedCrops()
      await mockFarmInSPWithTwoPlantedCrops()

      const sut = makeSut()
      const data = await sut.load()
      expect(data).toEqual({
        totalFarms: 4,
        totalAreaFarms: 2230,
        pieChartState: [{
          state: 'BA',
          percent: 50
        }, {
          state: 'MG',
          percent: 25
        }, {
          state: 'SP',
          percent: 25
        }],
        pieChartPlantedCrop: [{
          name: 'Café',
          percent: 28.57
        }, {
          name: 'Cana de Açucar',
          percent: 21.43
        }, {
          name: 'Milho',
          percent: 21.43
        }, {
          name: 'Melância',
          percent: 7.14
        }, {
          name: 'Soja',
          percent: 7.14
        }, {
          name: 'Algodão',
          percent: 14.29
        }],
        pieChartAgriculturalAreaLandUse: [{
          farmName: 'Fazendinha feliz',
          percent: 18.95
        }, {
          farmName: 'Pedaço do Céu',
          percent: 27.83
        }, {
          farmName: 'Fazenda Água Viva',
          percent: 11.73
        }, {
          farmName: 'Fazenda Alcalina',
          percent: 41.50
        }],
        pieChartVegetationAreaLandUse: [{
          farmName: 'Fazendinha feliz',
          percent: 12.93
        }, {
          farmName: 'Pedaço do Céu',
          percent: 26.36
        }, {
          farmName: 'Fazenda Água Viva',
          percent: 39.16
        }, {
          farmName: 'Fazenda Alcalina',
          percent: 21.55
        }]
      })
    })
    test('Deve retornar os dados do dashboard caso não tenha nenhum registro no banco de dados', async () => {
      const sut = makeSut()
      const data = await sut.load()
      expect(data).toEqual({
        totalFarms: 0,
        totalAreaFarms: 0,
        pieChartState: [],
        pieChartPlantedCrop: [],
        pieChartAgriculturalAreaLandUse: [],
        pieChartVegetationAreaLandUse: []
      })
    })
  })
})
