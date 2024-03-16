import express from 'express'
import type { Express } from 'express'
import { setupMiddlewares, setupRoutes } from '@/main/config'

export const setupApp = async (): Promise<Express> => {
  const app = express()
  setupMiddlewares(app)
  await setupRoutes(app)
  return app
}
