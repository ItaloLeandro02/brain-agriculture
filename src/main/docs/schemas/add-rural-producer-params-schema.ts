export const addRuralProducerParamsSchema = {
  type: 'object',
  properties: {
    cpfCnpj: {
      type: 'string'
    },
    name: {
      type: 'string'
    },
    farmName: {
      type: 'string'
    },
    cityName: {
      type: 'string'
    },
    state: {
      type: 'string'
    },
    totalArea: {
      type: 'number'
    },
    agriculturalArea: {
      type: 'number'
    },
    vegetationArea: {
      type: 'number'
    },
    plantedCrops: {
      type: 'array',
      items: {
        type: 'string'
      }
    }
  }
}
