import express from 'express'
import type { Express } from 'express'
import { setupMiddlewares, setupRoutes, setupSwagger } from '@/main/config'

export const setupApp = async (): Promise<Express> => {
  const app = express()
  setupSwagger(app)
  setupMiddlewares(app)
  await setupRoutes(app)
  return app
}
