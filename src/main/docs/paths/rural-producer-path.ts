export const addRuralProducerPath = {
  post: {
    tags: ['Produtor Rural'],
    summary: 'API para criar um produtor rural',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/addRuralProducerParams'
          }
        }
      }
    },
    responses: {
      204: {
        description: 'Sucesso'
      },
      400: {
        $ref: '#/components/badRequest'
      },
      404: {
        $ref: '#/components/notFound'
      },
      500: {
        $ref: '#/components/serverError'
      }
    }
  }
}

export const updateOrDeleteRuralProducerPath = {
  put: {
    tags: ['Produtor Rural'],
    summary: 'API para editar um produtor rural',
    parameters: [{
      in: 'path',
      name: 'id',
      description: 'Id do produtor rural a ser atualizado',
      required: true,
      schema: {
        type: 'string'
      }
    }],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/addRuralProducerParams'
          }
        }
      }
    },
    responses: {
      204: {
        description: 'Sucesso'
      },
      400: {
        $ref: '#/components/badRequest'
      },
      404: {
        $ref: '#/components/notFound'
      },
      500: {
        $ref: '#/components/serverError'
      }
    }
  },
  delete: {
    tags: ['Produtor Rural'],
    summary: 'API para deletar um produtor rural',
    parameters: [{
      in: 'path',
      name: 'id',
      description: 'Id do produtor rural a ser deletado',
      required: true,
      schema: {
        type: 'string'
      }
    }],
    responses: {
      204: {
        description: 'Sucesso'
      },
      404: {
        $ref: '#/components/notFound'
      },
      500: {
        $ref: '#/components/serverError'
      }
    }
  }
}
