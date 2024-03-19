import knex from 'knex'
import type { Knex } from 'knex'
import { env } from '@/main/config'

export const KnexHelper = {
  client: null as Knex,

  async connect (): Promise<void> {
    console.log(env.postgresUrl)
    this.client = knex({
      client: 'pg',
      connection: env.postgresUrl,
      pool: {
        min: 0,
        max: 6
      },
      searchPath: ['brain_agriculture']
    })
    await this.client.raw('SELECT 1')
  },

  async disconnect (): Promise<void> {
    await this.client.destroy()
  }
}
