import 'dotenv/config'

console.log(process.env.NODE_ENV)
console.log(process.env.POSTGRES_URL)

export const env = {
  port: process.env.PORT,
  postgresUrl: process.env.NODE_ENV === 'test' ? process.env.POSTGRES_URL_TEST : process.env.POSTGRES_URL
}
