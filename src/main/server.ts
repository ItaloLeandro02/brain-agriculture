import 'module-alias/register'
import { KnexHelper } from '@/infra/db/postgres/helpers'
import { env } from '@/main/config'

KnexHelper.connect()
  .then(async () => {
    const { setupApp } = (await import('@/main/config/app'))
    const app = await setupApp()
    app.listen(env.port, () => { console.log(`Server running at http://localhost:${env.port}`) })
  })
  .catch(console.error)
