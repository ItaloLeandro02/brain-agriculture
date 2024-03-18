exports.up = async function(knex) {
	await knex.schema.createSchemaIfNotExists('brain_agriculture')
}

exports.down = async function(knex) {
	await knex.schema.dropSchemaIfExists('brain_agriculture')
}

