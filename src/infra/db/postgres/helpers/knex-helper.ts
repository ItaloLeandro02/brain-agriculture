import knex from 'knex'
import type { Knex } from 'knex'

export const KnexHelper = {
  client: null as Knex,

  async connect (): Promise<void> {
    this.client = knex({
      client: 'pg',
      connection: {
        host: 'localhost',
        port: 5555,
        user: '',
        password: '',
        database: 'postgres'
      },
      searchPath: ['brain_agriculture'],
      pool: {
        min: 2
      }
    })
  },

  async disconnect (): Promise<void> {
    await this.client.destroy()
  }
}
