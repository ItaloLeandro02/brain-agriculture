import express from 'express'
import type { Express } from 'express'

export const setupApp = (): Express => {
  const app = express()
  return app
}
