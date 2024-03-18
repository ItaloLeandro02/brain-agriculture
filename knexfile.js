require('dotenv').config()

module.exports = {
	client: 'postgresql',
	connection: process.env.POSTGRES_URL,
	pool: {
		min: 2,
		max: 10
	}
};
