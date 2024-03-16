import 'dotenv/config'

export const env = {
  port: process.env.PORT,
  postgresUrl: process.env.POSTGRES_URL
}
