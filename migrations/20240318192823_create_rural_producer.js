exports.up = async function(knex) {
	await knex.schema.withSchema('brain_agriculture').createTableIfNotExists('rural_producer', (table) => {
		table.increments('id').primary()
		table.string('name', 50).notNullable()
		table.string('cpf_cnpj', 18).notNullable()
	})
}

exports.down = async function(knex) {
	await knex.schema.withSchema('brain_agriculture').dropTableIfExists('rural_producer')
}

