exports.up = async function(knex) {
	await knex.schema.withSchema('brain_agriculture').createTableIfNotExists('farm', (table) => {
		table.increments('id').primary()
		table.integer('rural_producer_id').notNullable()
		table.string('name', 100).notNullable()
		table.string('city_name', 100).notNullable()
		table.string('state', 2).notNullable()
		table.decimal('total_area', 5, 2).notNullable()
		table.decimal('agricultural_area', 5, 2).notNullable()
		table.decimal('vegetation_area', 5, 2).notNullable()
	})
}

exports.down = async function(knex) {
	await knex.schema.withSchema('brain_agriculture').dropTableIfExists('farm')
}

