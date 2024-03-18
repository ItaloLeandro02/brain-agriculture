exports.up = async function(knex) {
	await knex.schema.withSchema('brain_agriculture').createTableIfNotExists('planted_crop', (table) => {
		table.increments('id').primary()
		table.integer('farm_id').notNullable()
		table.string('name', 50).notNullable()
	})
}

exports.down = async function(knex) {
	await knex.schema.withSchema('brain_agriculture').dropTableIfExists('planted_crop')
}

