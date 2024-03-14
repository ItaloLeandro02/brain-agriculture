import knex from 'knex'
import type { Knex } from 'knex';

export const KnexHelper = {
	client: null as Knex,

	connect(): void {
		this.client = knex({
			client: 'pg',
			connection: {
				host: 'localhost',
				port: 5555,
				user: '',
				password: '',
				database: 'postgres',
			},
			searchPath: ['brain_agriculture'],
			pool: {
				min: 2,
			},
		})
	},

	getInstance(table: string): Knex {
		return this.client(table)
	},

	async disconnect (): Promise<void> {
		await this.client.destroy()
	}
}

