import express from 'express'
import type { Express } from 'express'
import { setupMiddlewares } from '@/main/config'

export const setupApp = (): Express => {
  const app = express()
  setupMiddlewares(app)
  return app
}
