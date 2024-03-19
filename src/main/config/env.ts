import 'dotenv/config'

export const env = {
  port: process.env.PORT,
  postgresUrl: process.env.NODE_ENV === 'test' ? process.env.POSTGRES_URL_TEST : process.env.POSTGRES_URL
}
