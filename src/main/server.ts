import 'module-alias/register'
import { KnexHelper } from '@/infra/db/postgres/helpers'

KnexHelper.connect()
  .then(async () => {
    const { setupApp } = (await import('@/main/config/app'))
    const app = await setupApp()
    app.listen(5050, () => { console.log('Server running at http://localhost:5050') })
  })
