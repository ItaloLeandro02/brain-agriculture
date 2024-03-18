export const dashboardPath = {
  get: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['Dashboard'],
    summary: 'API para exibir os dashboards',
    responses: {
      200: {
        description: 'Sucesso',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/dashboard'
            }
          }
        }
      },
      500: {
        $ref: '#/components/serverError'
      }
    }
  }
}
